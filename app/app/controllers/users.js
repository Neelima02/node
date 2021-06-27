const db = require("../models");
const User = db.users;
const crypto = require("crypto")

// To encrypt OPT or Password
const algorithm = 'aes-256-cbc';
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
const IV = "5183666c72eec9e4";

function encrypt(text){
  var cipher = crypto.createCipheriv(algorithm, ENC_KEY, IV)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

// To decrypt OPT or Password
function decrypt(text){
  var decipher = crypto.createDecipheriv(algorithm, ENC_KEY, IV)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.decryptPassword = async ( req, res) => {
  const passwordShown = req.body.message
    res.send(decrypt(passwordShown));
}

exports.signUp = async( req, res ) => {
    const {
        name,
        email,
        countryCode,
        phoneNumber,
        password
    } = req.body;

    const user =  await User.findOne ({ $and: [{
        email: email,
        phoneNumber: phoneNumber }]
    })  

    if (user != null) { 
      res.status(200).send({
        message: "Email or PhoneNumber Already Exists"
      });
    }

    else {   
      const user = new User({
        name: name,
        email: email,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        password: encrypt(password)
      });
    user
      .save(user)
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating."
      });
    });  
  }
}

exports.signIn = async( req , res ) => {
   const { userEmailPhone, password } = req.body;

    const user = await  User.findOne({ $or:
      [{ email: userEmailPhone},
       { userName: userEmailPhone}]
    })

    if (user == undefined) {
      res.status(200).send({
        message: "Enter Valid Value"
      });
    }

    else {
      if (user.password != encrypt(password)) {
        res.status(200).send({
          message: "Invalid Password"
        });
      }
      else {
        res.status(200).send({
          message: "Login Sucessfully"
        });
      }
    } 
  }
 
exports.forgotPassword = async( req, res) =>{
  const { id, password } = req.body;

  const user = await  User.findOne({ _id : id })
    if (!user) {
      res.status(200).send({
        message: "User was not found"
      });
    }
  
    else {
      const userUpdatedPassword = await User.updateOne({_id: id}, {$set:{ password:encrypt(password), updatedPasswordTime:new Date() }})
        console.log("updated...", userUpdatedPassword)
        res.status(200).send({
          message: "Updated Sucessfully"
        });
      }  
    } 