import React, { createContext,useEffect, useReducer } from 'react'
import {onAuthStateChanged } from "firebase/auth";
import { auth } from 'config/firebase';

export const AuthContext = createContext()
const initialState = { isAuthenticated: false  }




const reducer = ((state, action) => {
    // console.log(state)
    // console.log(action)
    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true }
        case "LOGOUT":
            return { isAuthenticated: false }
        default:
            return state
    }
})

export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
            //   const uid = user.uid;
            //   console.log(user)
            //   console.log("sign in")
              dispatch({type:"LOGIN"})
              console.log("sign IN")
              // ...
            } else {
              // User is signed out
              dispatch({type:"LOGOUT"})
              console.log("sign out")
              
              // ...
            }
          });

    },[])
    return (
        <AuthContext.Provider value={{ authentication:state, dispatch }}>
            {props.children}


        </AuthContext.Provider>
    )
}
