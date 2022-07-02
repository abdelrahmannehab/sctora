const { json } = require('body-parser');
const express = require('express');
const path  = require('path');
var cors = require('cors')
const multer = require('multer')
const { nanoid } = require('nanoid');
const ActorRouter  = require('./modules/Actor/actor.routes');
const CompanyRouter = require('./modules/Company/company.routes')
const PostRouter = require('./modules/Posts/post.routes')
const connectDB = require('./DB/connectDB');


require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


//public middlewear
app.use(express.json())

//cb stands for call back
app.use('/uploadImages', express.static(path.join(__dirname, 'uploadImages')))
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploadImages')
    },
    filename: function(req, file, cb) {

        cb(null, nanoid +"_"+ file.originalname)
    }
})

function fileFilter(req, file, cb) {

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true)

    } else {
        cb('sorry invalid extention', false)
    }

}

const upload = multer({ dest: 'uploadImages/', fileFilter, storage })
app.use(upload.array('image', 15))

// const corsOptions = {
//     origin: 'http://localhost:4200/'
// }

app.use(cors())

app.get("/",(req,res)=>{
    res.json({message:"Hello world"})
})
connectDB();
app.use(ActorRouter,CompanyRouter,PostRouter)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))