import { registerUserValidator, loginUserValidator, updateProfileValidator, deleteProfileValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { mailTransporter } from "../utils/mails.js";
import { AdvertModel } from "../models/advert.js";
// Register user (vendor or regular)
export const registerUser = async (req, res, next) => {
    try {
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await UserModel.findOne({ email: value.email });
        if (user) {
            return res.status(409).json('User already exists!');
        }
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        await UserModel.create({
            ...value,
            password: hashedPassword
        });
        await mailTransporter.sendMail({
            to: value.email,
            subject: 'User Registration',
            text: `Hello! ${value.name}, Your account has been registered successfully`
        });
        res.json("User registered!");
    } catch (error) {
        next(error);
    }
};

// Login user
export const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await UserModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exist!');
        }
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid Credentials");
        }
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        res.json({
            message: 'User logged in!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
};

// Get user profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await UserModel
            .findById(req.auth.id)
            .select({ password: false });
        res.json(user);
    } catch (error) {
        next(error);
    }
};

export const getUserAdverts = async (req, res, next) => {
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
            .find({
                ...filter,
                user: req.auth.id
            })
            .sort(JSON.parse(sort)) // Sort by the provided sort query
            .limit(Number(limit))   // Limit number of results
            .skip(Number(skip));    // Skip the first n results for pagination

        // Respond with the list of adverts
        res.status(200).json(adverts);
    } catch (error) {
        next(error);

    }
}

// Update user profile
export const updateProfile = async (req, res, next) => {
    try {
        const { error, value } = updateProfileValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await UserModel.findByIdAndUpdate(req.auth.id, value);
        res.json('User profile updated');
    } catch (error) {
        next(error);
    }
};

// Update user profile
export const deleteUserProfile = async (req, res, next) => {
    try {
        const { error, value } = deleteProfileValidator.validate({
            ...req.body,
            avatar: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        await UserModel.findByIdAndDelete(req.auth.id, value);
        res.json('User profile deleted');
    } catch (error) {
        next(error);
    }
};
