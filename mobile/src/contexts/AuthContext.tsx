import { UserDTO } from "@dtos/UserDTO"
import { api } from "@services/api"
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser"
import { createContext, ReactNode, useEffect, useState } from "react"

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  interface storageUserAndTokenProps {
    userData: UserDTO
    token: string
  } 

  async function storageUserAndToken({ userData, token }: storageUserAndTokenProps) {
    try {
      setIsLoadingUserStorageData(true);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
      setUser(userData);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }
  
  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      
      if(data.user && data.token) {
        storageUserAndToken(data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      storageUserRemove();
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);
      const userLogged = await storageUserGet();
  
      if(userLogged) {
        setUser(userLogged);
        setIsLoadingUserStorageData(false);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn,
      signOut,
      isLoadingUserStorageData
    }}>
      {children}
    </AuthContext.Provider>
  )
}