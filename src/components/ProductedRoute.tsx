import { ReactElement } from "react"
import { Navigate } from "react-router-dom"

interface ProductedRouteProps{
    children: ReactElement
}

export const ProductedRoute = ({ children }: ProductedRouteProps) => {
    return localStorage.getItem('token') ?  children : <Navigate to={'/signin'} />
}
