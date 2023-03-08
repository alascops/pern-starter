import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@stores/auth"

const AuthMiddleware = () => {
   const { user } = useAuthStore()

   const { pathname } = useLocation()

   return user ? <Outlet /> : <Navigate to="/login" state={{ pathname }} replace />
}

export default AuthMiddleware