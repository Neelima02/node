module.exports = mongoose => {
   
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name:  { type: String },
          email:  { type: String },
          countryCode : { type: String},
          phoneNumber:  { type: String },
          password:  { type: String },
          updatedPasswordTime : { type: Date },
          createdAt : { type: Date, default: Date.now } 
        }
      )
    );
  
    return User;
  };