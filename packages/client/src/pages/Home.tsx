import { Helmet } from "react-helmet-async"
import { toast } from "react-toastify"
import { faArrowRightFromBracket, faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useLogOutMutation } from "@apis/auth"
import { useAuthStore } from "@stores/auth"

const Home = () => {
   const { deauthenticate } = useAuthStore()

   const logOutMutation = useLogOutMutation()

   const handleLogOut = async () => {
      const logOut = await logOutMutation.mutateAsync()
      
      toast.clearWaitingQueue({
         containerId: "toast-container"
      })

      if (logOut.error) {
         toast(
            <p className="text-white text-center font-bold text-sm tracking-wide select-none">Log out failed!</p>
         , {
            toastId: "log-out-failed",
            containerId: "toast-container",
            className: "rounded !bg-red-500",
            progressClassName: "bg-white",
            icon: <FontAwesomeIcon className="text-white" icon={ faXmarkCircle } size="xl" fixedWidth />
         })

         return
      }
      
      deauthenticate()

      toast(
         <p className="text-white text-center font-bold text-sm tracking-wide select-none">Log out successful!</p>
      , {
         toastId: "log-out-success",
         containerId: "toast-container",
         className: "rounded !bg-green-500",
         progressClassName: "bg-white",
         icon: <FontAwesomeIcon className="text-white" icon={ faCheckCircle } size="xl" fixedWidth />
      })
   }
   
   return (
      <>
         <Helmet title="PERN Starter | Home" />

         <main className="grid place-items-center antialiased bg-gray-800 overflow-x-hidden overflow-y-auto w-full min-h-screen">
            <div className="flex flex-col items-center gap-y-10">
               <h1 className="text-white font-bold text-5xl text-center">Welcome to PERN Template!</h1>
               <button className="flex items-center gap-x-2.5 text-white font-semibold transition-all duration-300 ease-in-out rounded-sm bg-red-500 hover:brightness-90 hover:scale-105 w-fit px-2.5 py-1" type="button" onClick={ handleLogOut }>
                  <FontAwesomeIcon icon={ faArrowRightFromBracket } color="#FFFFFF" fixedWidth />
                  Log Out
               </button>
            </div>
         </main>
      </>
   )
}

export default Home