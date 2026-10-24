const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const auth = require("../middleware/auth");
const requireDatabase = require("../middleware/database");
const { validateRegister, validateLogin } = require("../middleware/validation");

router.post("/register", requireDatabase, validateRegister, register);
router.post("/login", requireDatabase, validateLogin, login);
router.get("/me", auth, requireDatabase, getMe);

module.exports = router;
