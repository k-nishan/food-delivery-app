import jwt from 'jsonwebtoken'

const authMidlleware = async(req,res,next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({success: false, message: "Not authorized. Login again!!"})
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        /* we generating the token based on the user id so getting the decoded user id and sending with request */
        req.body.userId = token_decode.id
        next();
    } catch(error) {
        console.log(error)
        return res.send({success: false, message: "Error"})
    }
}

export default authMidlleware