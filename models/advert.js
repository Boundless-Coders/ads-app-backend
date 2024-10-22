import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const advertSchema = new Schema({
    title: { type: String, required: true }, // Title of the advert
    description: { type: String}, // Description of the advert
    price: { type: Number}, // Price of the product/service
    category: { type: String}, // Category the advert falls under
    image: { type: String}, // URL or path to the image
    vendor: { type: Schema.Types.ObjectId, required: true, ref: 'User'} 
    // Reference to the user who posted the advert
}, {
    timestamps: true,
});

advertSchema.index({ title: 'text', category: 'text' }); // Index for text search

advertSchema.plugin(toJSON);

export const AdvertModel = model('Advert', advertSchema);
