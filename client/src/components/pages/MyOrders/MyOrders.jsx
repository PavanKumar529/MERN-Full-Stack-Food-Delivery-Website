import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext"
import axios from 'axios'
import { assets } from "../../../assets/assets"

const MyOrders = () => {

  const { url, token } = useContext(StoreContext)
  const [ data, setData ] = useState([])

  const fetchOrders = async() => {
    try {
      console.log("Fetching orders with token:", token);
      const response = await axios.post(url+"/api/order/userorders", {}, {headers: {token} });
      console.log("Full response:", response); // Log the full response

      if(response.data.success) {
        setData(response.data.data || []);
        console.log(response.data.data);
      }
      
      else {
        console.log("API Error:", response.data.message);
      }
    }
    catch(error) {
      console.log("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    if(token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className='my-orders'>
      <h1>My orders</h1>
      <div className="container">
        {
          data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>
                  {
                    order.items.map((item,index) => {
                      if(index === order.items.length - 1) {
                        return item.name + " X " + item.quantity
                      }
                      else {
                        return item.name + " X " + item.quantity + ", "
                      }
                    })
                  }
                  </p>
                  <p>₹{order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                  <button>Track Order</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MyOrders
