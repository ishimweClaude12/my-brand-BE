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
exports.editUser = exports.getUser = exports.deleteUser = exports.login = exports.register = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../model/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../utils/validation");
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        res.status(200).json({
            status: 'Success',
            results: users.length,
            data: {
                users
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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userValidatin = (0, validation_1.signUpValidator)(req.body);
        if (userValidatin.error) {
            throw new Error(`${(_a = userValidatin.error) === null || _a === void 0 ? void 0 : _a.details[0].message}`);
        }
        // Destructure variables from the body object passed
        const { firstName, lastName, email, password, role } = req.body;
        const isEmailAlreadyExist = yield user_model_1.default.findOne({
            email: email
        });
        if (isEmailAlreadyExist) {
            res.status(400).json({
                status: 'Fail',
                error: 'Email Already Registered'
            });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(6);
        const hashedPsw = yield bcrypt_1.default.hash(password, salt);
        const maxAge = 3 * 60 * 60;
        const user = new user_model_1.default({
            "first_name": firstName,
            "last_name": lastName,
            email,
            password: hashedPsw,
            role
        });
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, email: email }, process.env.JWT_SECRET, { expiresIn: maxAge });
        yield user.save();
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(201).json({
            status: 'Success',
            results: {
                firstName,
                lastName,
                email
            },
            token
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Can not create User  ' + error
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // Validate the email and password
        const userValidatin = (0, validation_1.signUpValidator)(req.body);
        if (userValidatin.error) {
            throw new Error(`${(_b = userValidatin.error) === null || _b === void 0 ? void 0 : _b.details[0].message}`);
        }
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            res.status(404).json({
                status: 'Failed',
                error: 'User Not Found'
            });
            return;
        }
        // If the user is found, Compare the password passed with the one in database
        const pswMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!pswMatch) {
            res.status(400).json({
                status: 'Failed',
                error: 'Oops!!. Incorrect Email or Password'
            });
            return;
        }
        // If the password matches, Create a token
        const maxAge = 3 * 60 * 60;
        const token = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email, role: user === null || user === void 0 ? void 0 : user.role }, process.env.JWT_SECRET, { expiresIn: maxAge, });
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
        });
        res.status(200).json({
            status: 'Success',
            message: 'Login Successful',
            token
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'Something went wrong  ' + error
        });
    }
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield user_model_1.default.deleteOne({ _id: id }).then(c => {
            res.status(200).json({
                status: 'Success',
                message: 'Successfuly deleted user'
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'User not found  |' + (error === null || error === void 0 ? void 0 : error.message)
        });
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield user_model_1.default.findOne({ _id: id }).then(c => {
            res.status(200).json({
                status: 'Success',
                data: c
            });
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Fail',
            message: 'User not found  |'
        });
    }
});
exports.getUser = getUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ _id: req.params.id });
        if (req.body.firstName) {
            if (user) {
                user.first_name = req.body.firstName;
            }
        }
        if (req.body.lastName) {
            if (user) {
                user.last_name = req.body.lastName;
            }
        }
        if (req.body.role) {
            if (user) {
                user.role = req.body.role;
            }
        }
        if (user)
            yield user.save();
        res.status(200).json({
            status: 'Success',
            data: user
        });
    }
    catch (_c) {
        res.status(404).json({
            status: 'Failed',
            error: "Such User doesn't Exist, Please use a valid ID"
        });
    }
});
exports.editUser = editUser;
