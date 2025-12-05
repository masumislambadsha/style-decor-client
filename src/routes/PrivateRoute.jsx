import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/Spinner/LoadingSpinner';

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation()
  if(loading){
   return <LoadingSpinner/>
  }
  if(!user){
    return <Navigate state={location.pathname} to={'/login'} />
  }
  return children
};

export default PrivateRoute;
