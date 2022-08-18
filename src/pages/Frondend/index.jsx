import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "pages/Frondend/Home"
import Header from "pages/Frondend/components/Header"
import Footer from './components/Footer'
import About from "./About"
import Contact from "./Contact"
import Todos from "./Todos"

export default function index() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/'>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/todos' element={<Todos />} />



          </Route>

        </Routes>
      </main>
      <Footer />
    </>
  )
}
