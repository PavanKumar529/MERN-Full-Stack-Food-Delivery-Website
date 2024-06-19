import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import userModel from "../models/userModel.js"


const createToken = (id) => {
    return jwt.sign( {id}, process.env.JWT_SECRET_KEY);
};

// Register User
const registerUser = async(req, res) => {

    const { name, email, password } = req.body;

    try {
        // Checking User already exists or not
        const existingUser = await userModel.findOne({ email })

        if(existingUser) {
            return res.json({message: "User alreaady exists", success: false })
        }

        // Validating email format & strong password
        if( !validator.isEmail(email) ) {
            return res.json({ message: "Please enter a valid email", success: false })
        }

        if(password.length < 8) {
            return res.json({message: "Please enter a Strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save()
        console.log(user);

        const token = createToken(user._id);
        res.json({ success: true, token });

    }
    catch(error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
}


// Login user
const loginUser = async(req, res) => {

    const { email, password } = req.body;
    
    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({ message: "User Doesn't Exist", success: false })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched) {
            return res.json({ message: "Invalid Credentials", success: false})
        }

        const token = createToken(user._id);
        res.json({ success: true, token });

    }
    catch(error) {
        console.log(error);
        res.json({ message:"Error", success: false})
    }
}


export { registerUser, loginUser };
