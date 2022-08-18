import { AuthContext } from 'context/AuthContext'
import React, { useState, useContext } from 'react'
import { serverTimestamp, setDoc, doc } from "firebase/firestore/lite";
import { firestore } from 'config/firebase';






const initialState = {
  title: '',
  location: '',
  discription: '',
}
export default function Hero() {


  const { user } = useContext(AuthContext)

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)




  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)
    let { title, location, discription } = state;
    title = title.trim();
    location = location.trim();
    discription = discription.trim();
    if (title.length < 3) {
      return window.notify("Title Length should be 3 chars ", "error");
    }
    if (location.length < 3) {
      return window.notify("Please Enter Locatin ", "error");
    }
    if (discription.length < 3) {
      return window.notify("Please enter discription ", "error");
    }
    let formData = { title, location, discription }


    formData.dataCreated = serverTimestamp()
    formData.id = window.getRandomId()
    formData.status = "Active"
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    }
    createDocument(formData)





    // console.log(user) 
    // console.log(state)
    // console.log(formData)
  }

  const createDocument = async (formData) => {
    setIsProcessing(true)
    try {
      await setDoc(doc(firestore, "todos", formData.id), formData);
      window.notify("Todo has beed Added successfully ", "success")

    } catch (err) {
      console.log(err)
      window.notify("something went Wrong ", "error")

    }
    setIsProcessing(false)
  }
  return (
    <div className="py-5 home d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card p-3 p-mb-4 p-lg-5">
              <form onSubmit={handleSubmit}>

                <div className="row mx-2">
                  <div className="col">
                    <h2 className="text-center mb-4"> Add todo </h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3 ">

                    <input type="text" className="form-control" name='title' placeholder="Title" onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3 ">
                    <input type="text" className="form-control" name='location' placeholder="Enter Location" onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col mb-3">

                    <textarea className="form-control" name='discription' placeholder="Enter Description" rows="5" onChange={handleChange} />

                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <button className='btn btn-danger w-100 ' disabled={isProcessing}>{!isProcessing ?
                      "Add Todo" :
                      <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    } </button>
                  </div>
                </div>



              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
