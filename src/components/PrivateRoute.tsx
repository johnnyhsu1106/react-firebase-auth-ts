import { useAuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return (
    user ? <Outlet /> : <Navigate to='/login' replace/>
  )
}

export default PrivateRoute
