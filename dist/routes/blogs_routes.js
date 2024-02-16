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
const express_1 = __importDefault(require("express"));
const blogsController_1 = require("../controller/blogsController");
const router = express_1.default.Router();
// Get all posts 
router.get('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, blogsController_1.getAllBlogs)(req, res);
}));
// Get a Single Blog
router.get("/blogs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, blogsController_1.getOneBlog)(req, res);
}));
// Create a post
router.post('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, blogsController_1.createBlog)(req, res);
}));
// Edit the Blog
router.patch("/blogs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, blogsController_1.editBlog)(req, res);
}));
// Delete a Blog
router.delete("/blogs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, blogsController_1.deleteBlog)(req, res);
}));
exports.default = router;
