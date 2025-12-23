import User from "../Models/User.js";

async function userAuthentication(req, res, next) {
  if (req.isAuthenticated() ) {
    const user = await User.findOne({ email: req.session.passport.user });
    if(user.role === "user"){
      res.status(200).json({message : "authenticated",status : true});
    }
    else{
      res.status(200).json({message : "not a user",status: false})
    }
  } else {
    res.status(200).json({message : "not authenticated",status : false});
  }
}

async function adminAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    const admin = await User.findOne({ email: req.session.passport.user });
    if (admin.role === "admin") {
      res.status(200).json({message : "authenticated"});
    } else {
      res.status(401).json({message : "not authenticated"});;
    }
  } else {
    res.status(401).json({message : "user not found"});;
  }
}

const authController = {adminAuthentication , userAuthentication};

export default authController;