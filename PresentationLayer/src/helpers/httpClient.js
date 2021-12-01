import axios from 'axios'
import { authHeader } from './authHeader'

export const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: authHeader()
})