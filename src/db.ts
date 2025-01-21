import mongoose, {model, Model, Schema} from "mongoose"

const UserSchema = new Schema({
    username: { type: String, unique: true},
    password: String
})

export const UserModel =  model("User", UserSchema);


const SontentSchema = new Schema({
    title: String,
    link: String,
    tags: [{types: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true }
})