import { useState } from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  const client = new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  } });

  return (
    <>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path='/Ioniagram' element={ <Login/> }></Route>
            <Route path='/Ioniagram/Signup' element={ <Signup/> }></Route>
            <Route path='/Ioniagram/Home' element={ <Home/> }></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
