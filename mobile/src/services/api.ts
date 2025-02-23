import { storageAuthTokenGet } from '@storage/storageAuthToken';
import { AppError } from '@utils/AppError';
import axios, { AxiosError, AxiosInstance } from 'axios'

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.3.105:3333'
}) as APIInstanceProps;

let failedQueue: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use((response) => {
    return response;
  }, async (requetError) => {
    const isNotAuthorized = requetError?.response?.status === 401;
    if(isNotAuthorized) {
      if(requetError.response.data?.message === 'token.expired' || requetError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet();

        if(!refresh_token) {
          signOut();
          return Promise.reject(requetError);
        }

        const originalRequestConfig = requetError.config;

        if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}`};
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              }
            })
          })
        }
        
        isRefreshing = true;
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