const asynchandler= require('express-async-handler')
const User=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  };


const registerUser = asynchandler(async (req,res) =>{
   
    const { name, email, password } = req.body;
 
    if (!name || !email || !password) {
      res.status(400); 
      throw new Error("Please fill in all required fileds");
    }
  
    const userExits = await User.findOne({ email });
    if (userExits) {
      res.status(400);
      throw new Error("Email is already exit");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),  // 1 day
      sameSite: "none",
      secure: true,
    });
  
    
  if (user) {
    const { _id, name, email, photo, role } = user;
    res.status(201).json({ _id, name, email, photo, token, role });
  } else {  
    res.status(400);
    throw new Error("Invalid user data");
  }
  
});




const loginUser= asynchandler(async(req,res)=>{
 
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add Email and Password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found, Please signUp");
    }
  
    const passwordIsCorrrect = await bcrypt.compare(password, user.password);
  
    const token = generateToken(user._id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    if (user && passwordIsCorrrect) {
        const { _id, name, email, photo, role } = user;
        res.status(201).json({ _id, name, email, photo, role, token });
      } else {
        res.status(400);
        throw new Error("Invalid email or password");
      }

});
 



const loginStatus= asynchandler(async(req,res)=>{

    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    if (verified) {
      return res.json(true);
    }
    return res.json(false);

});



const logoutUser = asynchandler(async (req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
  });

  

const loginAsSeller= asynchandler(async(req,res)=>{

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add Email and Password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400);
      throw new Error("User not found, Please signUp");
    }
  
    const passwordIsCorrrect = await bcrypt.compare(password, user.password);
  
    const token = generateToken(user._id);
  
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "none",
      secure: true,
    });
  
    user.role = "seller";
    user.save();

    if (user && passwordIsCorrrect) {
      const { _id, name, email, photo, role } = user;
      res.status(201).json({ _id, name, email, photo, role, token });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");

    }

});



const getUser = asynchandler(async (req, res) => {

    const user = await User.findById(req.user._id).select("-password");
  
    res.status(200).json(user);
  });




  const getUserBalance= asynchandler(async(req,res)=>{
   
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
  
    res.status(200).json({
      balance: user.balance,
    });

  })


  
  //admin 

  const getAllUsers=asynchandler(async(req,res)=>{
    const userList = await User.find({});

    if (!userList.length || userList.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }
  
    res.status(200).json(userList); 
  });




  const estimateIncome = asynchandler(async (req, res) => {

    try {

      const admin = await User.findOne({ role: "admin" });
      if (!admin) {
        return res.status(404).json({ error: "Admin user not found" });
      }
      const commissionBalance = admin.commissionBalance;

      res.status(200).json({ commissionBalance });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
    
  });




module.exports = {
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    loginAsSeller,
    getUser,
    getUserBalance,
    getAllUsers,
    estimateIncome
 
  };