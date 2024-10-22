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
        const { filter = "{}", sort = "{}", limit = 10, skip = 0 } = req.query;
        const adverts = await AdvertModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort))
            .limit(limit)
            .skip(skip);

        res.status(200).json(adverts);
    } catch (error) {
        next(error);
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