import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: String, // cloudnari Url
    required: true,
  },
  coverImage: {
    type: String, // cloudnari Url
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "video",
    },
  ],
  password : {
    type : String,
    required : [true , "Password is required"]
  },
  refreshToken : {
    type : String
  },

},{
    timestamps : true
});

userSchema.pre("save", async function(next){
    if(! this.isModified("password")) return next();

    this.password = bcrypt.hash("this.password",10)
    next()
})


userSchema.methods.ispasswordCorrect = async function(password){
     return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username  : this.username,
            fullname : this.fullname,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn :  process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);
