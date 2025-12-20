const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate:{
        validator:function(v) {
            return /\S+@\S+\.\S+/.test(v);
        },
        message:"Email must be in valid format!"
    }
  },

  phone: {
    type: String,
    required: true,
    validate:{
        validator:function(v) {
            return /\d{12}/.test(v);
        },
        message:"Phone number must be 12-digit number!"
    }
  },

  password:{
    type:String,
    required:true
  },

  role:{
    type:String,
    required:true
  }
}, { timestamps: true });

//Hash password before saving to database
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10); //Higher the number, more secure but slower
    this.password = await bcrypt.hash(this.password, salt); //Hash the password before saving

})

module.exports = mongoose.model("User", userSchema);
