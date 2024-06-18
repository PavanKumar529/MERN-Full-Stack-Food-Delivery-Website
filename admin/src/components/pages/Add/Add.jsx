import React, { useState } from 'react';
import "./Add.css";
import { assets } from "../../../assets/assets";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = () => {
  const url = "http://127.0.0.4:4000";
  const [image, setImage] = useState(null); // Initialize with null
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad", // default category if refresh
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Check if image is set
    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image); // Use state image
    
    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      
      console.log("Response from server:", response);

      // Check for success in the response
      if (response.data.success) {
        
        console.log("Food item successfully added.");

        // Clear the form data
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad", // default category if refresh
        });
        setImage(null);   // Reset image to null
        toast.success(response.data.message)
      } 
      else {
        toast.error(response.data.message)
        console.log("Failed to add food item:", response.data.message);      
      }
    } 
    catch (error) {
      console.log("Error uploading food item:", error);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category} required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='₹20' required/>
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  );
};

export default Add;
