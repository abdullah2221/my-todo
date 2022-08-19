import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from 'config/firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
const initialState = { email: ``, password: `` }
export default function Login() {
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const{dispatch} = useContext(AuthContext)
    const navigate = useNavigate()
    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleLogin = e => {
        e.preventDefault()
        let { email, password } = state;
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                dispatch({type:"LOGIN",payload:{user}})

                     window.notify("User has beed logged IN succesfully", "success")
                navigate("/dashboard")
           
                // ...
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                console.error(error)
                window.notify("Something went wrong ", "error")
            }).finally(() => {
                setIsProcessing(false)
            });


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
                                    <h3 className='mb-4'>LOGIN</h3>
                                </div>
                            </div>
                            <form onSubmit={handleLogin}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="email ">Email: </label>
                                        <input type="email" name="email" id='email' className='form-control' placeholder='Enter your Email' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="password ">Password: </label>
                                        <input type="password" id="passwowrd" name="password" className='form-control' placeholder='Enter your Passowrd' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <button className='btn w-100' disabled={isProcessing}>{!isProcessing
                                            ?
                                            "Login"
                                            :
                                            <div className='spinner-grow spinner-grow-sm'></div>
                                        }</button>
                                    </div>
                                </div>
                            </form>
                            <div className="row mt-4">
                                <div className="col">
                                    <p className='mb-0 text-center'>Need an account? <Link to="/authentication/register" className='text-dark'>Register</Link></p>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
