import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    console.log(token);
    if(!token) {
        return res.json({ message: "Not Authorized Login Again", success:false })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = token_decode.id;
        next()
    }
    catch(error) {
        console.log(error);
        res.json({ message:"Error", success: false})
    }
}

export default authMiddleware