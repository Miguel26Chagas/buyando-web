import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../stores/authStore"

export const GuardRoute = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return <Outlet />
}