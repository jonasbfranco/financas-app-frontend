import axios from 'axios'

const api = axios.create({
    baseURL: 'https://financas-app-backend-one.vercel.app'
})

export default api
