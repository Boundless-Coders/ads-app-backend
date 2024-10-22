import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String}, 
    price: { type: Number}, 
    category: { type: String}, 
    image: { type: String}, 
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User'} 
    // Reference to the user who posted the advert
}, {
    timestamps: true,
});

advertSchema.index({ title: 'text', category: 'text' }); // Index for text search

advertSchema.plugin(toJSON);

export const AdvertModel = model('Advert', advertSchema);
