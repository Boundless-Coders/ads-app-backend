import { Router } from "express";
import { addAdvert, getAdverts, updateAdvert, deleteAdvert, countAdverts, getAdvert } from "../controllers/advert.js";
import { advertImageUpload } from "../middlewares/upload.js"; // Middleware for image upload
import { isAuthenticated, hasPermission } from "../middlewares/auth.js";

// Create a router
const advertRouter = Router();

// Define routes for adverts

advertRouter.get('/adverts/count', countAdverts)
// Route to add a new advert (only accessible to authenticated vendors)
advertRouter.post('/adverts', isAuthenticated, hasPermission('add_advert'), advertImageUpload.single('image'), addAdvert);

// Route to get all adverts (accessible to all users)
advertRouter.get('/adverts', getAdverts);

advertRouter.get('/adverts/:id', getAdvert)

// Route to update an advert (only accessible to the advert's vendor)
advertRouter.patch('/adverts/:id', isAuthenticated, hasPermission('update_advert'), advertImageUpload.single('image'), updateAdvert);

// Route to delete an advert (only accessible to the advert's vendor)
advertRouter.delete('/adverts/:id', isAuthenticated, hasPermission('delete_advert'), deleteAdvert);

// Export router
export default advertRouter;
