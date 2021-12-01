import create from 'zustand'
import { persist } from "zustand/middleware"
import userSevice from '../services/userService'


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
              loginRequest(loginCredentials)
              const user = await userSevice.login(loginCredentials)
              loginSuccess(user)
            } catch (error) {
              console.log(error.response)
            }
          },
          register: async registerCredentials => {
            try {
              console.log(registerCredentials)
              const registerRequest = get().registerRequest
              const registerSuccess = get().registerSuccess
              registerRequest(registerCredentials)
              const id = await userSevice.register(registerCredentials)
              console.log(id)
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