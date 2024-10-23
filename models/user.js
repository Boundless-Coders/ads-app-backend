import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNumber: {type: Number, required: true},
    businessName: {type: String},
    role: { type: String, default: 'user', enum: ['user', 'vendor'] },
}, {
    timestamps: true,
})

userSchema.plugin(toJSON);

export const UserModel = model('user', userSchema);