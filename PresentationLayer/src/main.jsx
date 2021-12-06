import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from "@chakra-ui/react"
import { 
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import AdminDashboard from './layout/AdminDashboard'
import ClientDashboard from './layout/ClientDashboard'
import Register from './pages/Register'
import Login from './pages/Login'

import Clients from './pages/Admin/Clients'
import Products from './pages/Admin/Products'

import Accounts from './pages/Client/Accounts'
import Loans from './pages/Client/Loans'
import Cards from './pages/Client/Cards'
import CompleteInfo from './pages/Client/CompleteInfo'
import AccountActivity from './pages/Client/AccountActivity'
import Fees from './pages/Client/Fees'
import CardPayments from './pages/Client/CardPayments'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="clients" element={<Clients />} />
            <Route path="clients/:clientId" element={<Products />} />
          </Route>
          <Route path="client" element={<ClientDashboard />}>
            <Route path="accounts" element={<Accounts />} />
            <Route path="loans" element={<Loans />} />
            <Route path="cards" element={<Cards />} />
            <Route path="complete-info" element={<CompleteInfo />} />
            <Route path="accounts/:accountId" element={<AccountActivity />} />
            <Route path="loans/:loanId" element={<Fees />} />
            <Route path="cards/:cardId" element={<CardPayments />} />
          </Route>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
