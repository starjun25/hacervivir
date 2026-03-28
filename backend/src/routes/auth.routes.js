const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// POST /api/auth/register - Registrar nuevo usuario
router.post("/register", register);

// POST /api/auth/login - Login
router.post("/login", login);

module.exports = router;