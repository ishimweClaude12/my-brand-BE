"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidator = (signin) => {
    const userSchema = joi_1.default.object({
        "firstName": joi_1.default.string().min(2).max(12),
        "lastName": joi_1.default.string().min(2).max(12),
        "email": joi_1.default.string().email().required(),
        "password": joi_1.default.string().min(8).max(16).required(),
        "role": joi_1.default.string().optional()
    });
    return userSchema.validate(signin);
};
exports.signUpValidator = signUpValidator;
