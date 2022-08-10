import React,{useContext}from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from 'context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
export default function Navbar() {
  
  const {authentication,dispatch} = useContext(AuthContext)
 
  const {isAuthenticated} = authentication
  const handleLogOut=()=>{
    signOut(auth)
    .then(()=>{
       dispatch({type:"LOGOUT"})
    })
    .catch((err)=>{
      console.error(err)
    })
   

  }
  return (
    <div><nav className="navbar navbar-expand-lg bg-dark navbar-dark">
    <div className="container">
      <Link to="/" className="navbar-brand" >Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          {/* <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" href="#">Action</Link></li>
              <li><Link className="dropdown-item" href="#">Another action</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" href="#">Something else here</Link></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link disabled">Disabled</Link>
          </li> */}
        </ul>
        <div className="d-flex">{!isAuthenticated
        ?
        <Link to="/authentication/login" className="btn btn-primary text-white" >Login</Link>
        
        :
        <>
        <Link to="/dashboard" className="btn btn-primary text-white btn-sm mx-2" >DashBoard</Link>
        <Link to="/" className="btn btn-danger text-white btn-sm" onClick={handleLogOut} >LogOut</Link>
        
        </>

      
      
      
      }
          
        </div>
      </div>
    </div>
  </nav></div>
  )
}
