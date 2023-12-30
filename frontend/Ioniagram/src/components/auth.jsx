import { useState, createContext, useContext } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
    } 

    const logout = () => {
        localStorage.setItem("user", null)
        localStorage.setItem("userid", null)
        
        console.log(localStorage.getItem("user"))
        setUser(null);
    }

    return (
    <AuthContext.Provider value={{ user, login, logout}}>{children}</AuthContext.Provider>
    )}

    export const useAuth = () => {
        return useContext(AuthContext)
    }