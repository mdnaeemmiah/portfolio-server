import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../user/user.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";



const authRouter = Router();

authRouter.post('/register', validateRequest(UserValidation.UserValidationSchema), AuthControllers.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);
// authRouter.post(
//     '/refresh-token',
//     validateRequest(AuthValidation.refreshTokenValidationSchema),
//     AuthControllers.refreshToken,
//   );

export default authRouter;