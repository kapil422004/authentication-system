import jwt from "jsonwebtoken"

export const userAuth = (req, res, next)=>{

    const {token} = req.cookies;

    if(!token){
        return res.json({sucess:false, message:"Not authorized please login again"})
    }

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        if(decodeToken.id){

            req.user = { id: decodeToken.id };
            //user id will be added from token to user which is in req with key name userId.
        }else{
            return res.json({success:false, message:"Not authorized please login again"})
        }

        next();

    } catch (error) {
        return res.json({success:false, message:error.message})
    } 

}