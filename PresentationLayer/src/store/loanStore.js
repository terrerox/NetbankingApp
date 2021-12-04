import create from 'zustand'
import { persist } from "zustand/middleware"
import loanService from '../services/loanService'


export const useLoanStore = create(persist(
  (set, get) => (
      {
        loans: [], 
        loan: {}, 
        status: {}, 
        loanRequest : () => set({ status: { isLoading: true } }),
        loanSuccess : () => set({ status: { isLoading: false } }),
        setLoans : (loans) => set({ loans: loans }),
        setLoan : (loan) => set({ loan: loan }),
        getLoans: async (clientId) => {
            try {
              const loanRequest = get().loanRequest
              const loanSuccess = get().loanSuccess
              const setLoans = get().setLoans
              loanRequest()
              const loans = await loanService.getAll(clientId)
              setLoans(loans)
              loanSuccess()
              console.log(loans)
              return user
            } catch (error) {
                console.log(error.response)
            }
          },
          addLoan: async (loan) => {
            try {
              const loanRequest = get().loanRequest
              const loanSuccess = get().loanSuccess
              const setLoans = get().setLoans
              loanRequest()
              const loans = await loanService.add(loan)
              setLoans(loans)
              loanSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          updateLoan: async (loan) => {
            try {
              const loanRequest = get().loanRequest
              const loanSuccess = get().loanSuccess
              const setLoans = get().setLoans
              loanRequest()
              const loans = await loanService.update(loan)
              setLoans(loans)
              loanSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          deleteLoan: async (id) => {
            try {
              const loanRequest = get().loanRequest
              const loanSuccess = get().loanSuccess
              const setLoans = get().setLoans
              loanRequest()
              const loans = await loanService.delete(id)
              setLoans(loans)
              loanSuccess()
            } catch (error) {
                console.log(error.response)
            }
          }
      }
  ),
  {
    name: "loan-storage"
  }
))