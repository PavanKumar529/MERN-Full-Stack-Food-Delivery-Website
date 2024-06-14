// import React from 'react'
import Navbar from "./components/Navbar/Navbar"
import { Route, Routes } from 'react-router-dom'
import Home from "./components/pages/Home/Home"
import Cart from "./components/pages/Cart/Cart"
import PlaceOrder from "./components/pages/PlaceOrder/PlaceOder"

const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/place-order" element={<PlaceOrder/>}/>
      </Routes>
    </div>
  )
}

export default App
