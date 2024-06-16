// import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from 'react-router-dom'
import Home from "./components/pages/Home/Home"
import Cart from "./components/pages/Cart/Cart"
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopUp from "./components/LoginPopUp/LoginPopUp"

const App = () => {

  const [ showLogin, setShowLogin ] = useState(false)

  return (
    <div className="app">
      { showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </div>
  )
}

export default App
