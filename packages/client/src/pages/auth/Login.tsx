import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"
import { toast } from "react-toastify"
import { z, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { useLogInMutation } from "@apis/auth"
import { useAuthStore } from "@stores/auth"

const validation = z.object({
   identity: z.string({ invalid_type_error: "Username or E-mail Address is invalid.", required_error: "Username or E-mail Address is required." })
      .trim()
      .min(1, { message: "Username or E-mail Address is required." })
      .max(320, { message: "Username or E-mail Address must not be more than 320 characters." }),
   password: z.string({ invalid_type_error: "Password is invalid.", required_error: "Password is required." })
      .trim()
      .min(8, { message: "Password must not be less than 8 characters." })
      .max(15, { message: "Password must not be more than 15 characters." })
})

type Fields = TypeOf<typeof validation>

const Login = () => {
   const { formState: { errors }, handleSubmit, register, resetField } = useForm<Fields>({
      resolver: zodResolver(validation)
   })

   const { authenticate } = useAuthStore()

   const logInMutation = useLogInMutation()

   const handleLogIn: SubmitHandler<Fields> = async (data) => {
      const logIn = await logInMutation.mutateAsync({
         identity: data.identity,
         password: data.password
      })

      toast.clearWaitingQueue({
         containerId: "toast-container"
      })

      if (logIn.error) {
         resetField("password")
         
         toast(
            <p className="text-white text-center font-bold text-sm tracking-wide select-none">Log in failed!</p>
         , {
            toastId: "log-in-failed",
            containerId: "toast-container",
            className: "rounded !bg-red-500",
            progressClassName: "bg-white",
            icon: <FontAwesomeIcon className="text-white" icon={ faXmarkCircle } size="xl" fixedWidth />
         })

         return
      }
      
      authenticate(logIn)

      toast(
         <p className="text-white text-center font-bold text-sm tracking-wide select-none">Log in successful!</p>
      , {
         toastId: "log-in-success",
         containerId: "toast-container",
         className: "rounded !bg-green-500",
         progressClassName: "bg-white",
         icon: <FontAwesomeIcon className="text-white" icon={ faCheckCircle } size="xl" fixedWidth />
      })
   }

   const handleLogInError: SubmitErrorHandler<Fields> = () => {
      toast.clearWaitingQueue({
         containerId: "toast-container"
      })

      toast(
         <p className="text-white text-center font-bold text-sm tracking-wide select-none">Log in failed!</p>
      , {
         toastId: "login-error",
         className: "rounded !bg-red-500",
         progressClassName: "bg-white",
         icon: <FontAwesomeIcon className="text-white" icon={ faXmarkCircle } size="xl" fixedWidth />,
         delay: 150
      })
   }

   return (
      <main className="grid grid-cols-12 place-items-center antialiased bg-gray-800 overflow-x-hidden overflow-y-auto w-full min-h-screen">
         <div className="col-start-5 col-end-9 w-full mx-auto">
            <form className="flex flex-col gap-y-4 py-10" onSubmit={ handleSubmit(handleLogIn, handleLogInError) }>
               <div className="flex flex-col gap-y-2">
                  <input { ...register("identity") } className="rounded-sm focus:outline-none px-2 py-1.5" type="text" placeholder="Enter Username or E-mail Address" autoFocus />
                  { errors.identity && <small className="text-red-600">{ errors.identity.message }</small> }
               </div>

               <div className="flex flex-col gap-y-2">
                  <input { ...register("password") } className="rounded-sm focus:outline-none px-2 py-1.5" type="password" placeholder="Enter Password" />
                  { errors.password && <small className="text-red-600">{ errors.password.message }</small> }
               </div>

               <button className="self-center text-white rounded-sm bg-green-500 px-5 py-1.5" type="submit">Log In</button>
            </form>
         </div>
      </main>
   )
}

export default Login