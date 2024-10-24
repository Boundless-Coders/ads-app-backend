import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, getUserAdverts } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();

// Define routes for user operations
// Route to register a new user
userRouter.post('/users/register', registerUser);

// Route to login a user
userRouter.post('/users/login', loginUser);

// Route to get the logged-in user's profile (must be authenticated)
userRouter.get('/users/me', isAuthenticated, getProfile);

userRouter.get('/users/me/adverts', isAuthenticated, getUserAdverts);

// Route to update the user's profile (must be authenticated)
userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

// Export router
export default userRouter;
