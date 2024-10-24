import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, getUserAdverts, deleteUserProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();


userRouter.post('/users/register', registerUser);
userRouter.post('/users/login', loginUser);
userRouter.get('/users/me', isAuthenticated, getProfile);
userRouter.get('/users/me/adverts', isAuthenticated, getUserAdverts);
userRouter.delete('/delete', isAuthenticated, hasPermission('delete_profile'), deleteUserProfile) 
userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);

// Export router
export default userRouter;
