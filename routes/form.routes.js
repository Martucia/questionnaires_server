const express = require("express");
const { create, getAll, get, update, remove, getUserFields, sendForm } = require('../controllers/form.controller')
const formRouter = express.Router();
const authMiddleware = require('../middleware/auth.middleware')

formRouter.post(
    "/",
    authMiddleware,
    create
);

formRouter.get(
    "/",
    authMiddleware,
    getAll
);

formRouter.get(
    "/:id",
    get
);

formRouter.put(
    "/:id",
    authMiddleware,
    update
);

formRouter.delete(
    "/:id",
    authMiddleware,
    remove
);

formRouter.post(
    "/vacancies",
    getUserFields
)

formRouter.post(
    "/sendForm",
    sendForm
)

module.exports = formRouter;