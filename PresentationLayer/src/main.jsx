import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from "@chakra-ui/react"
import { 
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
