import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    _id: string;
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    requred: true,
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserShema: Schema<User> = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please use valid email address"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verify is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code expiry is required"],
  },
  isVerified: {
    type:  Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages:[MessageSchema]
});



const Usermodel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserShema))

export default Usermodel;