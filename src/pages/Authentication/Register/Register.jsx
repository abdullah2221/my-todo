import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from 'config/firebase';
import { doc, setDoc } from 'firebase/firestore/lite';

import { AuthContext } from 'context/AuthContext';

const initialState = { email: ``, password: `` }
export default function Register() {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const {dispatch} = useContext(AuthContext)

    // const handleChange = (e) => {
    //     setState(s => ({ ...s, [e.target.email]: e.target.value }))

    // }
    // const handleRegister = e => {
    //     e.preventDefault()
    //     let { email, password } = state;
    //     console.log(state)
    //     setIsProcessing(true)
    // createUserWithEmailAndPassword(auth,email,password)
    // .then((userCredential)=>{
    //     let user = userCredential.user
    //     console.log(user)
    // })
    // .catch((err)=>{
    //     console.error(err)

    // })
    // .finally(()=>{
    //     setIsProcessing(false) 
    // })
    // createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed in 
    //         const user = userCredential.user;

    //         console.log("User Registered")
    //         console.log(userCredential)
    //         console.log(user)

    //     })
    //     .catch((error) => {
    //         console.error(error)
    //         // ..
    //     });
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        console.log(state)

        const { email, password } = state

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                addDocument(user)
                console.log(user)


            })
            .catch((error) => {
                console.error(error)
                setIsProcessing(false) // ..
            }) 

        const addDocument = async (user) => {
            try {
                await setDoc(doc(firestore, "users", user.uid), {
                    firstName: "",
                    lastName: "",
                    uid: user.uid, 
                    email:user.email, 
                });
                console.log("user document created at firestore")
                dispatch({type:"LOGIN"})
            }
            catch (err) {
                console.error(err)
            }
            // await setDoc(doc(firestore, "users", user.uid), {
            //             firstName: "",
            //             lastName: "",
            //             uid: user.uid,  
            //             email:user.email,
            //         });
            //         console.log("user document created at firestore")
            //         dispatch({type:"LOGIN"})
            setIsProcessing(false)
        }



        console.log(email)
        console.log(password)


    }
    return (
        <div className="auth">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-2 col-md-8 offset-md-2 col-lg-6 offset-lg-3 ">
                        <div className="card p-2 p-md-3 p-lg-4">
                            <div className="row">
                                <div className="col">
                                    <h3 className='mb-4'>REGISTER</h3>
                                </div>
                            </div>
                            <form onSubmit={handleRegister}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="email ">Email: </label>
                                        <input type="email" name="email" id="email" className='form-control' placeholder='Enter your Email' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="password ">Password: </label>
                                        <input type="password" name="password" id="password" className='form-control' placeholder='Enter your Passowrd' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className='btn w-100' disabled={isProcessing}>{!isProcessing
                                            ?
                                            "Register"
                                            :
                                            <div className='spinner-grow spinner-grow-sm'></div>
                                        }</button>
                                    </div>
                                </div>

                            </form>
                            <div className="row mt-4">
                                <div className="col">
                                    <p className='mb-0 text-center'>Already have an account? <Link to="/authentication/login" className='text-dark'>LOGIN</Link></p>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
