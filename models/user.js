import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    userName: { type: String, required: true },
    businessName: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: {type: Number, required: true},
    role: { type: String, default: 'user', enum: ['user', 'vendor'] },
}, {
    timestamps: true,
})

userSchema.plugin(toJSON);

export const UserModel = model('user', userSchema);