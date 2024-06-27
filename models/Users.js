import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    username : {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
})

const User = models.User || model("User" , UserSchema) 
export default User;