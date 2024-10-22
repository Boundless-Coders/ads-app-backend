// upload.js
import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// Middleware for uploading advert images
export const advertImageUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/advert-api/adverts/*' // Path for storing advert images
    }),
    preservePath: true
});

// Middleware for uploading user avatar images
export const userAvatarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath: '/advert-api/users/*' // Path for storing user avatars
    }),
    preservePath: true
});
