import jwt from "jsonwebtoken";

const userAuth = async(req,res,next) => {
    // console.log(cookies);
    const {token} = req.cookies; 

    if(!token){
        return res.status(401).json({success: false, message: "Not Authorized, Login Again"});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(tokenDecode.id)
        if(tokenDecode && tokenDecode.id){
            req.userId = tokenDecode.id;
        }
        else{
            return res.status(401).json({success: false, message: 'Not Authorized, Login Again'});
        }

        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(400).json({success: false, message: error.message});
    }
}
export default userAuth;