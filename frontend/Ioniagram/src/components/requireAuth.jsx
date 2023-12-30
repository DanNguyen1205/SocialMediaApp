import React from 'react'
import { useAuth } from './auth'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const auth = useAuth()

    //If user is not logged in navigate them to login.
  if(auth.user == null && JSON.parse(localStorage.getItem("user")) == null){
    return <Navigate to="/Ioniagram/Login"></Navigate>
  }

  //Else return the page that is protected behind authorization.
  return children
}

