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
import Clients from './pages/Admin/Clients'
import Products from './pages/Admin/Products'
import Client from './pages/Client'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:clientId" element={<Products />} />
          </Route>
          <Route path="client" element={<AdminLayout />}>
            <Route path="" element={<Client />} />
          </Route>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
