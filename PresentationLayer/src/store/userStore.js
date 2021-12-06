import create from 'zustand'
import { persist } from "zustand/middleware"
import userSevice from '../services/userService'
import clientService from '../services/clientService'


export const useUserStore = create(persist(
  (set, get) => (
      {
        loggedClient: {}, 
        status: {}, 
        userToken: null,
        loginRequest : (user) => set({ status: { loggingIn: true }, user }),
        loginSuccess : (user) => set({ status: { loggedIn: true }, user }),
        setLoggedClient : (client) => set({ loggedClient: client }),
        loginFailure : () => set({ status: { loggedIn: false }, user: null, loggedClient: null }),
        logoutSuccess : () => set({ status: { loggedIn: false }, user: null, loggedClient: null }),
        registerRequest : () => set({ status: { registering: true } }),
        registerSuccess : () => set({ status: {} }),
        registerFailure : () => set({ status: {} }),
        logout: () => {
          const logoutSuccess = get().logoutSuccess
          userSevice.logout()
          logoutSuccess()
        },
        login: async loginCredentials => {
            try {
              const loginRequest = get().loginRequest
              const loginSuccess = get().loginSuccess
              loginRequest(loginCredentials.user)
              const user = await userSevice.login(loginCredentials)
              console.log(user)
              loginSuccess(user)
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
              const registerFailure = get().registerFailure
              registerFailure()
              console.log(error.response)
            }
          }
      }
  ),
  {
    name: "user-storage"
  }
))