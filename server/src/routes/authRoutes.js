const router=require('express').Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
        //requiring USER model
const User = require('../model/User');
        //requiring verifyToken middleware
const verifyToken = require('./verifyToken');

const { secretKey } = require('../../config/db');

//login credentials check
router.post('/loginCheck',async (req,res)=>
{
    //check if Email(username) exists in the database (if user exists)
    const userExist= await User.findOne({username:req.body.user.username});
    console.log(userExist)
    if(!userExist) return res.json({'msg':"invalid credentials"});

    //checking whether user entered valid password - by using the COMPARE function offered by bcryptjs (coz passwords are hashed)
    const validPass= await bcrypt.compare(req.body.user.password,userExist.password);
    //if passwords do not match
    if(!validPass) return res.json({"msg":"invalid credentials"});
    //if OK
        //creating a TOKEN
        const payload = { _id:userExist._id , role:userExist.role }
        const token=jwt.sign(payload,secretKey);
        
        res.json({"msg":"success","token":token});      //token sent as response
})
//signup credentials saving
router.post('/signupUser',async (req,res)=>
{
    //check if Email(username) exists in the database (if user already exists)
    const userExist= await User.findOne({username:req.body.user.username});
    if(userExist) return res.json({'msg':"username taken"});

    //hash passwords
    const salt=await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.user.password,salt); //hashing
    const user=new User(
            {
        username:req.body.user.username,
        password:hashPassword,
        role:req.body.user.role
            });

            try
            {
                const savedUser = await user.save();    //saving data of valid user
                return res.json({"msg":"saved","data":savedUser});
            }
            catch(err)
            {
                return res.json({"msg":"error"}); //redirecting to home page
            }
})

module.exports=router;