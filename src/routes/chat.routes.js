import { Router } from "express";
import chatsController from "../controllers/chats.controller.js";
import {isAuthenticated} from "../helpers/auth.js"
import {userAccess} from "../helpers/roleValidate.js"

const router = Router();

const {
    renderChats
} = chatsController;


// Chat
router.get("/", isAuthenticated, userAccess, renderChats);


export default router;