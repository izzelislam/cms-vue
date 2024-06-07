import axios from "axios"

import { base_url } from "../util"
export const useFetchApi = (option) => {
  const api = axios.create({
    baseURL : base_url,
    ...option
  })


  api.interceptors.response.use((response) => {
    return response.data
  }, (error) => {
    return Promise.reject(error.response)
  })

  api.defaults.headers.common['accept'] = `application/json`

  return api; 
}