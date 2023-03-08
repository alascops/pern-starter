import { useMutation, useQuery } from "@tanstack/react-query"
import { type User } from "@prisma/client"
import { type AxiosError } from "axios"
import { api } from "@config/axios"
import { client } from "@config/client"

export const useCheckAuthMutation = () => useQuery<Nullable<User>, AxiosError>({
   queryKey: ["auth"],
   queryFn: async () => (await api.get("/auth/check")).data
})

export const useLogInMutation = () => useMutation<User & RequestError, AxiosError, { identity: string } & Pick<User, "password">>({
   mutationKey: ["auth-login"],
   mutationFn: async (data) => (await api.post(`/auth/authenticate`, data)).data,
   onSuccess: () => {
      client.invalidateQueries({ queryKey: ["auth"] })
   }
})

export const useLogOutMutation = () => useMutation<{ userId: string } & RequestError, AxiosError>({
   mutationKey: ["auth-logout"],
   mutationFn: async () => (await api.delete(`/auth/deauthenticate`)).data,
   onSuccess: () => {
      client.invalidateQueries({ queryKey: ["auth"] })
   }
})