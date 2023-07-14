import { Router } from 'express';
import viewsControler from "../controllers/views.controller.js"
import {isAuthenticated} from "../helpers/auth.js"

const router = Router();

const {
    renderIndex,
    renderProducts,
    renderFound,
    renderLosses,
    renderAbout,
    renderMyCart,
    renderSignUpForm,
    renderSignInFrom,
    renderSignProfile,
    renderResetPassword,
} = viewsControler;

router.get("/", renderIndex);
router.get("/products", renderProducts);
router.get("/found", renderFound);
router.get("/losses", renderLosses);
router.get("/about", renderAbout);
router.get("/cart", isAuthenticated, renderMyCart);
router.get("/signup", renderSignUpForm);
router.get("/signin", renderSignInFrom);
router.get("/profile", isAuthenticated, renderSignProfile);
router.get("/resetpassword", isAuthenticated, renderResetPassword);

export default router;