import { AdvertModel } from "../models/advert.js";
import { addAdvertValidator, updateAdvertValidator } from "../validators/advert.js"

export const addAdvert = async (req, res, next) => {
    try {
        const { error, value } = addAdvertValidator.validate({
            ...req.body,
            image: req.file?.filename,

        })
        if (error) {
            return res.status(422).json(error);
        }

        await AdvertModel.create({
            ...value,
            user: req.auth.id
        });
        res.status(201).json('Advert was added');

    } catch (error) {
        next(error);
    }
};

export const getAdverts = async (req, res, next) => {
    try {
        // Extract query params
        const { title, category, minPrice, maxPrice, limit = 10, skip = 0, sort = "{}" } = req.query;
        let filter = {}; 

        // If title query param exists, perform a case-insensitive search on the title field
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // 'i' for case-insensitive
        }

        // If category query param exists, add it to the filter
        if (category) {
            filter.category = category;
        }

        // If minPrice or maxPrice query params exist, filter by price range
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = minPrice; 
            if (maxPrice) filter.price.$lte = maxPrice; 
        }

        // Fetch adverts from the database based on filter, with pagination and sorting
        const adverts = await AdvertModel
            .find(filter)
            .sort(JSON.parse(sort)) // Sort by the provided sort query
            .limit(Number(limit))   // Limit number of results
            .skip(Number(skip));    // Skip the first n results for pagination

        // Respond with the list of adverts
        res.status(200).json(adverts);
    } catch (error) {
        next(error); // Pass any error to the error handler middleware
    }
};



export const countAdverts = async (req, res, next) => {
    try {
        const { } = req.body;
        //count adverts in database
        const count = await AdvertModel.countDocuments(JSON.parse(filter));
        //Respond to request
        res.json({ count })
    } catch (error) {
        next(error);

    }
}

export const getAdvert = async (req, res, next) => {
    try {
        const { id } = req.params;
        //Get advert by id from database
        const advert = await AdvertModel.findById(id);
        res.json(advert);
    } catch (error) {
        next(error);

    }
}

export const updateAdvert = async (req, res, next) => {
    try {
        const { error, value } = updateAdvertValidator.validate({
            ...req.body,
            image: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Update the advert
        const advert = await AdvertModel.findByIdAndUpdate(req.params.id, value);
        // Respond with success message
        res.json('Advert updated');
    } catch (error) {
        next(error);
    }
};


export const deleteAdvert = async (req, res, next) => {
    try {
        await AdvertModel.findByIdAndDelete(req.params.id);
        res.json('Advert deleted');
    } catch (error) {
        next(error);
    }
};



