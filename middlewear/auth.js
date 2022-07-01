


const auth = async(req,res,next)=>{

        const authorization = req.headers['Authorization']; 
        console.log(authorization);
}

module.exports = {
    auth
}