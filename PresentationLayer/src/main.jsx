import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from "@chakra-ui/react"
import { 
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import AdminLayout from './layout/AdminLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Client from './pages/Client'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="clients" element={<Admin />} />
          </Route>
          <Route path="client" element={<AdminLayout />}>
            <Route path="" element={<Client />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
