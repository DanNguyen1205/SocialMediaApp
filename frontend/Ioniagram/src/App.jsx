import { useState, useEffect } from 'react'
import { AuthProvider } from './components/auth'

import  { RequireAuth } from './components/requireAuth'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Explore from './pages/Explore'


function App() {

  const client = new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  } });

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path='/Ioniagram/Login' element={ <Login/> }></Route>
              <Route path='/Ioniagram/Signup' element={ <Signup/> }></Route>
              <Route path='/Ioniagram' element={<RequireAuth><Home/></RequireAuth>}></Route>
              <Route path='/Ioniagram/Profile/:id' element={<RequireAuth><Profile/></RequireAuth>}></Route>
              <Route path='/Ioniagram/Explore' element={<RequireAuth><Explore/></RequireAuth>}></Route>
            </Routes>
          </Router>
        </QueryClientProvider>
      </AuthProvider>
    </>
  )
}

export default App
