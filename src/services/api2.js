import axios from 'axios'

const api2 = axios.create({
  baseURL: 'https://api.b7web.com.br/devcond/api/admin',
})

export { api2 }
