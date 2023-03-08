import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@stores/auth"

const GuestMiddleware = () => {
   const { user } = useAuthStore()

   const { state } = useLocation()

   return !user ? <Outlet /> : <Navigate to={ state?.pathname || "/" } replace />
}

export default GuestMiddleware