import { Router } from "express";
import passport from "passport";
import {isAuthenticated} from "../helpers/auth.js"
import sessionsController from "../controllers/sessions.controller.js"

const router = Router();

const { 
    singup,
    failsignup,
    signin,
    failsignin,
    resetpassword,
    github,
    githubcallback,
    logout,
    current
} = sessionsController;

router.post("/signup", passport.authenticate('signup', {failureRedirect:'/failsignup'}), singup);
router.get('/failsignup', failsignup);
router.post("/signin", passport.authenticate('signin', {failureRedirect:'/failsignin'}), signin);
router.get('/failsignin', failsignin);
router.post('/resetpassword', isAuthenticated, resetpassword);
router.get('/github', passport.authenticate('github', {scope:['user:email']}) , github);
router.get('/githubcallback', passport.authenticate('github',{failureRedirect:'/signin'}), githubcallback);
router.get("/logout", logout);
router.get('/current', current);

export default router;