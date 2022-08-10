import React from 'react'
import {Routes,Route} from "react-router-dom"
import ForgotPassowrd from './ForgotPassword'
import Login from "./Login"
import Register from './Register'
export default function index() {
  return (
    <>
    <Routes>
        <Route path='/'>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgot-password' element={<ForgotPassowrd/>}/>


        </Route>




    </Routes>
    
    </>
  )
}
