import create from 'zustand'
import { persist } from "zustand/middleware"
import accountService from '../services/accountService'


export const useAccountStore = create(persist(
  (set, get) => (
      {
        accounts: [], 
        account: {}, 
        status: {}, 
        accountRequest : () => set({ status: { isLoading: true } }),
        accountSuccess : () => set({ status: { isLoading: false } }),
        setAccounts : (accounts) => set({ accounts: accounts }),
        setAccount : (account) => set({ account: account }),
        getAccounts: async (clientId) => {
            try {
              const accountRequest = get().accountRequest
              const accountSuccess = get().accountSuccess
              const setAccounts = get().setAccounts
              accountRequest()
              const accounts = await accountService.getAll(clientId)
              setAccounts(accounts)
              accountSuccess()
              console.log(accounts)
              return user
            } catch (error) {
                console.log(error.response)
            }
          },
          addAccount: async (account) => {
            try {
              const accountRequest = get().accountRequest
              const accountSuccess = get().accountSuccess
              const setAccounts = get().setAccounts
              console.log(account)
              accountRequest()
              const accounts = await accountService.add(account)
              setAccounts(accounts)
              accountSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          updateAccount: async (account) => {
            try {
              const accountRequest = get().accountRequest
              const accountSuccess = get().accountSuccess
              const setAccounts = get().setAccounts
              accountRequest()
              const accounts = await accountService.update(account)
              setAccounts(accounts)
              accountSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          deleteAccount: async (id) => {
            try {
              const accountRequest = get().accountRequest
              const accountSuccess = get().accountSuccess
              const setAccounts = get().setAccounts
              accountRequest()
              const accounts = await accountService.delete(id)
              setAccounts(accounts)
              accountSuccess()
            } catch (error) {
                console.log(error.response)
            }
          }
      }
  ),
  {
    name: "account-storage"
  }
))