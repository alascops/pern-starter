import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
   const navigate = useNavigate()

   const navigateBack = () => {
      navigate("/", {
         replace: true
      })
   }
   
   return (
      <>
         <Helmet title="PERN | Page Not Found" />
         
         <main className="grid place-items-center antialiased bg-gray-800 overflow-x-hidden overflow-y-auto w-full min-h-screen">
            <div className="flex flex-col items-center gap-y-10">
               <h1 className="text-white font-bold text-5xl text-center">404 | Page Not Found</h1>
               <button className="text-white text-xl transition-base rounded-sm bg-green-500 hover:brightness-80 hover:scale-105 px-5 py-1.5" type="button" onClick={ navigateBack }>Go Back</button>
            </div>
         </main>
      </>
   )
}

export default PageNotFound