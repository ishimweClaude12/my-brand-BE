"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../model/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../utils/validation");
require("dotenv/config");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield user_model_1.default.find();
        res.status(200).json({
            status: 'Success',
            results: post.length,
            data: {
                posts: post
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'Failed',
            error: 'Sorry this operation failed' + err,
        });
    }
});
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userValidatin = (0, validation_1.signUpValidator)(req.body);
        if (userValidatin.error) {
            throw new Error(`${(_a = userValidatin.error) === null || _a === void 0 ? void 0 : _a.details[0].message}`);
        }
        const { firstName, lastName, email, password } = req.body;
        const oldUser = user_model_1.default.findOne({
            email
        });
        console.log(oldUser);
        const newUser = {
            "first_name": req.body.firstName,
            "last_name": req.body.lastName,
            "email": req.body.email,
            'password': req.body.password
        };
        const token = jsonwebtoken_1.default.sign({ email: newUser.email }, 'mysecretisthatthereisnosecrete', { expiresIn: '1h' });
        const post = new user_model_1.default();
        yield post.save();
        res.status(201).json({
            status: 'Success',
            results: {
                "first_name": req.body.firstName,
                "last_name": req.body.lastName,
                "email": req.body.email,
                'password': req.body.password
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Can not create Blog  ' + error
        });
    }
});
exports.createUser = createUser;
