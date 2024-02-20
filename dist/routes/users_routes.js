"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controller/usersController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const usersRouter = express_1.default.Router();
usersRouter
    .get('/users', auth_middleware_1.adminAuth, usersController_1.getAllUsers)
    .get('/users/:id', usersController_1.getUser)
    .post('/users/register', auth_middleware_1.adminAuth, usersController_1.register)
    .post('/users/login', usersController_1.login)
    .delete('/users/:id', auth_middleware_1.adminAuth, usersController_1.deleteUser)
    .patch('/users/:id', auth_middleware_1.adminAuth, usersController_1.editUser);
exports.default = usersRouter;