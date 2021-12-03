import create from 'zustand'
import { persist } from "zustand/middleware"
import userSevice from '../services/userService'
import clientService from '../services/clientService'


export const useUserStore = create(persist(
  (set, get) => (
      {
        status: {}, 
        userToken: null,
        loginRequest : (user) => set({ status: { loggingIn: true }, user }),
        loginSuccess : (user) => set({ status: { loggedIn: true }, user }),
        loginFailure : () => set({ status: { loggedIn: false }, user: null }),
        logout : () => set({ status: { loggedIn: false }, user: null }),
        registerRequest : () => set({ status: { registering: true } }),
        registerSuccess : () => set({ status: {} }),
        registerFailure : () => set({ status: {} }),
        login: async loginCredentials => {
            try {
              const loginRequest = get().loginRequest
              const loginSuccess = get().loginSuccess
              loginRequest(loginCredentials.user)
              const user = await userSevice.login(loginCredentials)
              loginSuccess(user)
              console.log(user)
              return user
            } catch (error) {
              const loginFailure = get().loginFailure
              loginFailure()
            }
          },
          register: async registerCredentials => {
            try {
              const { 
                identityCard, 
                ...credentialsWithoutIdentityCard
              } = registerCredentials 
              const registerRequest = get().registerRequest
              const registerSuccess = get().registerSuccess
              registerRequest(credentialsWithoutIdentityCard)
              const id = await userSevice.register(credentialsWithoutIdentityCard)
              const client = await clientService.getByIdentityCard(identityCard)
                console.log(client)
              if(client.success) {
                const {userId, ...clientWithoutUserId} = client.data
                const clientData = {...clientWithoutUserId, userId: id}
                await clientService.update(clientData)
              }
              registerSuccess(id)
            } catch (error) {
              console.log(error.response)
            }
          }
      }
  ),
  {
    name: "user-storage"
  }
))