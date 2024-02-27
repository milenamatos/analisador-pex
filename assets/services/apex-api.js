import axios from 'axios'

export const apiHost = process.env.APEX_API
console.log(process.env.APEX_API)

const axiosClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
