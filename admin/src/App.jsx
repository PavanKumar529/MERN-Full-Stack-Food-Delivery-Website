import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route } from "react-router-dom"
import Add from "./components/pages/Add/Add"
import List from "./components/pages/List/List"
import Orders from "./components/pages/Orders/Orders"

const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
