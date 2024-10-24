import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile, getUserAdverts, deleteUserProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router
const userRouter = Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', isAuthenticated, hasPermission ('get_profile'), getProfile);
userRouter.get('/users/me/adverts', isAuthenticated, getUserAdverts);
userRouter.delete('/delete', isAuthenticated, hasPermission('delete_profile'), deleteUserProfile) 
userRouter.patch('/update', isAuthenticated, hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile);


export default userRouter;
