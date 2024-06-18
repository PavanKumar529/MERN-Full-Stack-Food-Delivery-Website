import React, { useState } from 'react'
import "./List.css"
import axios from "axios"

const List = () => {
  
  const url = "http://127.0.0.4:4000";
  const [ list, setList ] = useState([])

  const fetchList = async() => {
    const response = await axios.post(`${url}/api/food/add`, formData)
    if(response.data.success) {
      setList({
        name: "",
        description: "",
        price: "",
        category: "Salad", // default category if refersh
      })
      setImage(false)
    }
    else {

    }
  }
  return (
    <div>
      <h1>List</h1>
    </div>
  )
}

export default List
