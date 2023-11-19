import axios from 'axios'

export const apiHost = process.env.APEX_API || 'https://analisador-pex-api-1c47044f34e9.herokuapp.com/'
console.log(process.env.APEX_API)

const axiosClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
