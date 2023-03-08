import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type User } from "@prisma/client"

export interface AuthStore {
   user: Nullable<User>,
   authenticate: (user: User) => void,
   deauthenticate: () => void
}

export const useAuthStore = create<AuthStore>()(
   persist((set) => ({
      user: null,
      authenticate: (user) => set((state) => ({
         ...state, user
      })),
      deauthenticate: () => set((state) => ({
         ...state, user: null
      }))
   }), {
      name: "auth-store"
   })
)