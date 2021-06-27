module.exports = app => {

    const users = require("../controllers/users.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/register", users.signUp);
    
    router.post("/login", users.signIn);

    router.post("/forgot", users.forgotPassword)

    router.post("/decrypt", users.decryptPassword);
  
    app.use('/api/users', router);
  };