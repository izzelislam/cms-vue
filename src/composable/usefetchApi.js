import axios from "axios"

import { base_url } from "../util"
import { useCredentialStore } from "../store/credential";
export const useFetchApi = (option) => {

  const credentialStore = useCredentialStore();
  const token = credentialStore.token;

  const api = axios.create({
    baseURL : base_url,
    ...option
  })

  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  api.interceptors.response.use((response) => {
    return response.data
  }, (error) => {
    return Promise.reject(error.response)
  })

  api.defaults.headers.common['accept'] = `application/json`

  return api; 
}