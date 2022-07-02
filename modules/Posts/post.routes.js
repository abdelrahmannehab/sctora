const { auth } = require("../../middlewear/auth");
const { createPost, likePost } = require("./controller/post");


const router = require("express").Router();

router.post("/post" ,  auth(),  createPost);
router.patch("/post/like/:id" ,  auth(), likePost);


module.exports = router;