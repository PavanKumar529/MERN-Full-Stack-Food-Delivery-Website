// import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from 'react-router-dom'
import Home from "./components/pages/Home/Home"
import Cart from "./components/pages/Cart/Cart"
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import LoginPopUp from "./components/LoginPopUp/LoginPopUp"
import Verify from "./components/pages/Verify/Verify"
import MyOrders from "./components/pages/MyOrders/MyOrders"

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
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>} />
        <Route path="/myorders" element={<MyOrders/>} />
      </Routes>
    </div>
    <Footer/>
    </div>
  )
}

export default App
