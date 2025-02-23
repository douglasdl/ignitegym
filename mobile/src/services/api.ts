import { AppError } from '@utils/AppError';
import axios, { AxiosInstance } from 'axios'

type SignOut = () => void;

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.3.105:3333'
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => {
    return response;
  }, (requetError) => {
    const isNotAuthorized = requetError?.response?.status === 401;
    if(isNotAuthorized) {
      if(requetError.response.data?.message === 'token.expired' || requetError.response.data?.message === 'token.invalid') {
        
      }

      signOut();
    }




    if(requetError.response && requetError.response.data) {
      return Promise.reject(new AppError(requetError.response.data.message));
    } else {
      return Promise.reject(requetError);
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api };