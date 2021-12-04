import create from 'zustand'
import { persist } from "zustand/middleware"
import cardService from '../services/cardService'


export const useCardStore = create(persist(
  (set, get) => (
      {
        cards: [], 
        card: {}, 
        status: {}, 
        cardRequest : () => set({ status: { isLoading: true } }),
        cardSuccess : () => set({ status: { isLoading: false } }),
        setCards : (cards) => set({ cards: cards }),
        setCard : (card) => set({ card: card }),
        getCards: async (clientId) => {
            try {
              const cardRequest = get().cardRequest
              const cardSuccess = get().cardSuccess
              const setCards = get().setCards
              cardRequest()
              const cards = await cardService.getAll(clientId)
              setCards(cards)
              cardSuccess()
              console.log(cards)
              return user
            } catch (error) {
                console.log(error.response)
            }
          },
          addCard: async (card) => {
            try {
              const cardRequest = get().cardRequest
              const cardSuccess = get().cardSuccess
              const setCards = get().setCards
              cardRequest()
              const cards = await cardService.add(card)
              setCards(cards)
              cardSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          updateCard: async (card) => {
            try {
              const cardRequest = get().cardRequest
              const cardSuccess = get().cardSuccess
              const setCards = get().setCards
              cardRequest()
              const cards = await cardService.update(card)
              setCards(cards)
              cardSuccess()
            } catch (error) {
                console.log(error.response)
            }
          },
          deleteCard: async (id) => {
            try {
              const cardRequest = get().cardRequest
              const cardSuccess = get().cardSuccess
              const setCards = get().setCards
              cardRequest()
              const cards = await cardService.delete(id)
              setCards(cards)
              cardSuccess()
            } catch (error) {
                console.log(error.response)
            }
          }
      }
  ),
  {
    name: "card-storage"
  }
))