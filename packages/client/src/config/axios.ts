import axios, { type CreateAxiosDefaults } from "axios"

const axiosConfig: CreateAxiosDefaults = {
   baseURL: `${ import.meta.env.VITE_SERVER_BASE_URL }/api`,
   headers: {
      "Content-Type": "application/json"
   },
   withCredentials: true
}

export const api = axios.create(axiosConfig)