import create from 'zustand'
import { persist } from "zustand/middleware"
import clientService from '../services/clientService'


export const useClientStore = create(persist(
  (set, get) => (
      {
        clients: [], 
        client: {}, 
        status: {}, 
        clientRequest : () => set({ status: { isLoading: true } }),
        clientSuccess : () => set({ status: { isLoading: false } }),
        setClients : (clients) => set({ clients: clients }),
        setClient : (client) => set({ client: client }),
        getClients: async () => {
            try {
              const clientRequest = get().clientRequest
              const clientSuccess = get().clientSuccess
              const setClients = get().setClients
              clientRequest()
              const clients = await clientService.getAll()
              setClients(clients)
              clientSuccess()
              return clients
            } catch (error) {
                console.log(error.response)
            }
          },
          addClient: async (client) => {
            try {
              const clientRequest = get().clientRequest
              const clientSuccess = get().clientSuccess
              const setClients = get().setClients
              clientRequest()
              const clients = await clientService.add(client)
              setClients(clients)
              clientSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          updateClient: async (client) => {
            try {
              const clientRequest = get().clientRequest
              const clientSuccess = get().clientSuccess
              const setClients = get().setClients
              clientRequest()
              const clients = await clientService.update(client)
              setClients(clients)
              clientSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          deleteClient: async (id) => {
            try {
              const clientRequest = get().clientRequest
              const clientSuccess = get().clientSuccess
              const setClients = get().setClients
              clientRequest()
              const clients = await clientService.delete(id)
              setClients(clients)
              clientSuccess()
            } catch (error) {
                console.log(error.response)
            }
          }
      }
  ),
  {
    name: "client-storage"
  }
))