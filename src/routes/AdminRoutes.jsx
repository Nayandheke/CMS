import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const AdminRoutes = ({element}) => {
    const user = useSelector(state => state.user.value)

    return user.type == "Admin" ? element : <Navigate to="/"/>
}