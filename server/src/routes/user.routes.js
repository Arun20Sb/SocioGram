import { Router } from "express";
import {
  AllPostUsers,
  CreatePostUser,
  getAllUsers,
  LoginUser,
  LogoutUser,
  SignupUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, AllPostUsers);

router.route("/sign-up").post(SignupUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(verifyJWT, LogoutUser);

router
  .route("/create-post")
  .post(verifyJWT, upload.single("photo"), CreatePostUser);

router.route("/all-users").get(getAllUsers);

export { router };
