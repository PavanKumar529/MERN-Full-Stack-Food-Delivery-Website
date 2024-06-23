import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";

    try {
        const { userId, items, amount, address } = req.body;

        // Validate request body
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ message: "Missing required fields", success: false });
        }

        // Log the received data for debugging
        console.log("Received order data:", { userId, items, amount, address });

        // Create a new order in the database
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 200,
            },
            quantity: 1,
        });

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            // payment_method_types: ['card'],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Log the created Stripe session for debugging
        console.log("Stripe session created:", session);

        res.json({ session_url: session.url, success: true });
    } catch (error) {
        // Log the error details
        console.error("Error during placeOrder:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    console.log(orderId, success);

    try {
        if(success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ message: "Paid", success: true });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ message: "Not Paid", success: false });
        }
    }

    catch (error) {
        // Log the error details
        console.error("Error during verifyOrder:", error);
        res.status(500).json({ message: "Error", success: false });
    }
};

//  User Orders for Frontend
const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({ data: orders, success: true })
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error", success: false})
    }
}


// Listening orders for admin pannel 
const listOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ data: orders, success: true })
    }
    catch(error) {
        console.log(error);
        res.json({ message: "Error", success: false})
    }
}


// API fro Updating order status
const updateStatus = async(req, res) => {
    try {
        console.log("Request body:", req.body);
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        if (order) {
            res.json({ message: "Status Updated", success: true });
        } else {
            res.json({ message: "Order not found", success: false });
        }
    }
    catch(error) {
        console.log("Error during updateStatus:", error);
        res.json({ message: "Error while Updating Status", success: false })
    }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
