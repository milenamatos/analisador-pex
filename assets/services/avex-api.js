import axios from 'axios'

export const apiHost = process.env.AVEX_API || 'http://localhost:3001'

const axiosClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
