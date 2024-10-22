import Joi from "joi";

// Validator for adding a new advert
export const addAdvertValidator = Joi.object({
    title: Joi.string().required(),          // Title of the advert is required
    description: Joi.string(),    // Description of the advert is required
    price: Joi.number().positive(), // Price should be a positive number and is required
    category: Joi.string(),       // Category of the advert is required
    image: Joi.string(),          // Image URL or path is required
    // vendor: Joi.string()          // Vendor ID is required
});

// Validator for updating an existing advert
export const updateAdvertValidator = Joi.object({
    title: Joi.string(),                      // Title is optional for updates
    description: Joi.string(),                // Description is optional for updates
    price: Joi.number().positive(),           // Price should be a positive number if provided
    category: Joi.string(),                   // Category is optional for updates
    image: Joi.string()                       // Image URL or path is optional for updates
});
