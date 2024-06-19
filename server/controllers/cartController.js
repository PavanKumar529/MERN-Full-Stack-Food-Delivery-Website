import userModel from "../models/userModel.js"


// Add items to user cart
const addToCart = async(req, res) => {
    try {
        // let userData = await userModel.findOne({_id:req.body.userId})
        // or 
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({ message: "Added To Cart", success: true })        
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error while Added To Cart", success:false })
    }
}


// Remove items from user cart
const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({ message: "Removed From Cart",success:true })
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error while Removed From Cart",success:true })
    }
}

// fetch user cart data
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;  
        res.json({ success:true, cartData })  
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Something wrong while getting Cart Data",success:true })
    }
}

export { addToCart, removeFromCart, getCart }