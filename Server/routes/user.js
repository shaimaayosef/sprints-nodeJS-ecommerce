const User = require("../models/User")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")
const router = require("express").Router()
//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try {
        if((req.body.isAdmin || !req.body.isAdmin) && req.user.id === req.params.id ){
        res.status(401).json("you are not allowed to do that")
    }else if ((req.body.isAdmin || !req.body.isAdmin) && req.user.isAdmin){
        res.status(401).json("you are not allowed to do that")
    }else{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body 
            }, { new: true })
            res.status(200).json(updatedUser)
    }
        
    } catch (err) {
        res.status(500).json(err)
    }
})
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})
//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, isAdmin, ...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})
// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id : -1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router