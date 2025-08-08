const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require("../controllers/user.controller");
const { validateRegister, validateLogin } = require("../middlewares/validateUser");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/logout", logoutUser);


module.exports = router;
