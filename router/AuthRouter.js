import express from "express"
import { ValidasiMiddeleware } from "../middleware/ValidasiMiddleware.js";
import { ControllerLogin, ControllerLogout } from "../controllers/AuthController.js";
import { SchemaAuthLogin } from "../utils/Schema.js";
import { verifyToken } from "../middleware/verifyToken.js";

const AuthRouter = express.Router();
AuthRouter.post('/auth/login', ValidasiMiddeleware(SchemaAuthLogin), ControllerLogin)
AuthRouter.post('/auth/logout', verifyToken, ControllerLogout)
export default AuthRouter;