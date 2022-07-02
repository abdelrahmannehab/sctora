const postModel = require("../../../DB/model/Post");
const actorModel = require("../../../DB/model/Actor");

const populateList=[{
    path:"userID",
    select:"ActorEmail UserName ActorProfilcePic"
},{
    path:"likes",
    select:"ActorEmail UserName ActorProfilcePic"
}
]
const createPost = async(req, res) => {
    try {
        let imageURL = []
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                let imagepath = `${req.protocol}://${req.headers.host}/${req.files[i].destination}/${req.files[i].filename}`;
                imageURL.push(imagepath)
            }
        }
        const { desc, tagsList } = req.body;

        const newPost = new postModel({ desc, images: imageURL, userID: req.actor._id })
        const savedPost = await newPost.save()
 
        res.json({ message: 'Done', savedPost })
    } catch (error) {
        res.json({ message: "catch err"})
    }


}




const likePost = async(req, res) => {

    try {
        const { id } = req.params;

        const post = await postModel.findOne({ _id: id })
        if (post) {

            const findUser = post.likes.find((ele) => {
                return ele.toString() == req.actor._id.toString()

            })


            if (req.actor._id.toString() == post.userID.toString()) {
                res.json({ message: "sorry you cannot like your own post"})

            } else {
                if (findUser) {
                    res.json({ message: "sorry you cannot like this twice",  })
                } else {

                    post.likes.push(req.user._id);
                    const updatedPost = await postModel.findByIdAndUpdate(post._id, { likes: post.likes }, { new: true }).populate(populateList);
                    res.json({ message: "Done", updatedPost})

                }
            }


        } else {
            res.status(400).json({ message: "not found", status: 400 })

        }
    } catch (error) {
        res.status(500).json({ message: "catch err", satus: 500 })

    }

}






module.exports = {
    createPost,
    likePost,
  
}