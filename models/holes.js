

import mongoose, { Schema } from "mongoose";


const HoleSchema = new Schema({
    holeNumber: Number,
    par: Number,
    strokes: Number,
    totalPutts: Number,
    FIR: Boolean,
    GIR: Boolean
});


const RoundSchema = new Schema({
    name: String, 
    holes: [HoleSchema] 
});


const UserSchema = new Schema({
    username: String,
    rounds: [RoundSchema] 
});


const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
