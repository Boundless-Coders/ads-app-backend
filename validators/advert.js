import Joi from "joi";

// Validator for adding a new advert
export const addAdvertValidator = Joi.object({
    title: Joi.string().required(),          
    description: Joi.string(),    
    price: Joi.number().positive(), 
    category: Joi.string(),       
    image: Joi.string(),          
    // vendor: Joi.string()          // Vendor ID is required
});

// Validator for updating an existing advert
export const updateAdvertValidator = Joi.object({
    title: Joi.string(),                      
    description: Joi.string(),                
    price: Joi.number().positive(),           
    category: Joi.string(),                   
    image: Joi.string()                       
});
