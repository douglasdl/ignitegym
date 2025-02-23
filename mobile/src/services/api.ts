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
  }, (error) => {
    if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Erro no servidor. Tente novamente mais tarde."));
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api };