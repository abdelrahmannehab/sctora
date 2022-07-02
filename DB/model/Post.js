const mongoose = require('mongoose');



const postShema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    desc: String,
    images: Array,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isBlooked:{type:Boolean , default:false}


}, {
    timestamps: true
})

const postModel = mongoose.model('Post', postShema)

module.exports = postModel