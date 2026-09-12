const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validation");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", auth, getMe);

module.exports = router;
