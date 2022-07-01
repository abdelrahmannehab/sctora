const auth = ()=>{

    return(req,res,next) =>{
        const headerToken = req.headers['authorization']
        console.log(headerToken)
    }
}

module.exports = {
    auth
}