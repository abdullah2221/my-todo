import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Frontend from "pages/Frondend"
import Dashboard from "pages/Dashboard"
import Authentication from "pages/Authentication"
import { AuthContext } from 'context/AuthContext'
import PrivateRoute from 'components/PrivateRoute'
export default function CustomRoutes() {
  const { authentication } = useContext(AuthContext)
  const { isAuthenticated } = authentication
  return (
    <>
      <BrowserRouter>
        <main>
          <Routes >
            <Route path='/*' element={<Frontend />} />
            <Route path='/authentication/*' element={!isAuthenticated?<Authentication />:  <Navigate to="/dashboard" replace/>} />
            <Route path='/dashboard/*' element={<PrivateRoute Component ={<Dashboard/>}/>} />


          </Routes>






        </main>
      </BrowserRouter>
    </>
  )
}
