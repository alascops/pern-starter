import { Route, Routes } from "react-router-dom"

// Pages Imports
import Home from "@pages/Home"
import PageNotFound from "@pages/misc/PageNotFound"

// Auth Pages Imports
import AuthMiddleware from "@middlewares/AuthMiddleware"

// Guest Pages Imports
import GuestMiddleware from "@middlewares/GuestMiddleware"
import Login from "@pages/auth/Login"

const WebRoutes = () => {
   return (
      <Routes>
         {/* Both authenticated and guest users can access */}

         {/* Only authenticated users can access */}
         <Route element={ <AuthMiddleware /> }>
            <Route index element={ <Home /> } />
         </Route>

         {/* Only guest users can access */}
         <Route element={ <GuestMiddleware /> }>
            <Route path="/login" element={ <Login /> } />
         </Route>
         
         {/* Page is not found */}
         <Route path="*" element={ <PageNotFound /> } />
      </Routes>
   )
}

export default WebRoutes