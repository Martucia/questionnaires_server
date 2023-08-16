const express = require("express");
const { login, auth, registration } = require("../controllers/user.controller");
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware')
const userRouter = express.Router();

userRouter.post(
    "/login",
    [
        check('email', 'Некоректна пошта').isEmail()
    ],
    login
);

userRouter.get(
    "/",
    authMiddleware,
    auth
);

userRouter.post(
    "/reg",
    registration
);

module.exports = userRouter;