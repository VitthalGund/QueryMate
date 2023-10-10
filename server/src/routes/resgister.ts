import express from "express";
const router = express.Router();
import { handleNewUser } from "../controllers/registerUser.js";
import { validationResult, body } from "express-validator";
import { verifyUser } from "../controllers/registerUser.js";

router.post(
  "/",
  [
    body("username").isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
  ],
  async (req: express.Request, res: express.Response) => {
    // to validate the user details to create new user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await handleNewUser(req, res);
  }
);

router.post("/verify", verifyUser);

export default router;
