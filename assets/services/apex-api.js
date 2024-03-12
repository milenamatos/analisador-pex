import axios from 'axios'

export const apiHost = process.env.APEX_API || 'http://localhost:3001/'
console.log(process.env.APEX_API)

const axiosClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
