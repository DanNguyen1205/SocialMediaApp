import React from 'react'
import { useAuth } from './auth'
import { Navigate } from 'react-router-dom'

export const RequireAuth = ({children}) => {
    const auth = useAuth()

    console.log(auth.user)
    console.log(localStorage.getItem("user"))
    //If user is not logged in navigate them to login.
  if(auth.user == null && JSON.parse(localStorage.getItem("user")) == null){
    return <Navigate to="/Ioniagram/Login"></Navigate>
  }

  //Else return the page that is protected behind authorization.
  return children
}

