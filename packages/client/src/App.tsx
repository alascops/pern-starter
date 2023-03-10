import { useEffect } from "react"
import { ToastContainer, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { useCheckAuthMutation } from "@apis/auth"
import { useAuthStore } from "@stores/auth"
import WebRoutes from "@/routes"
import PageLoading from "@pages/misc/PageLoading"

const App = () => {
   const { data: user, isLoading: userIsLoading } = useCheckAuthMutation()

   const { authenticate } = useAuthStore()

   useEffect(() => {
      if (user) authenticate(user)
   }, [user])

   return userIsLoading ? <PageLoading /> : (
      <>
         <WebRoutes />

         <ToastContainer
            containerId="toast-container"
            autoClose={ 3000 }
            closeButton={ false }
            draggable
            draggablePercent={ 50 }
            limit={ 2 }
            newestOnTop
            position="top-center"
            theme="colored"
            transition={ Zoom }
         />
      </>
   )
}

export default App