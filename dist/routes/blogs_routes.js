"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogsController_1 = require("../controller/blogsController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = __importDefault(require("../middleware/multer"));
const validateBlog_1 = __importDefault(require("../middleware/validateBlog"));
const router = express_1.default.Router();
router.get('/blogs', blogsController_1.getAllBlogs)
    .get("/blogs/:id", blogsController_1.getOneBlog)
    .post('/blogs', multer_1.default.single('image'), validateBlog_1.default, auth_middleware_1.adminAuth, blogsController_1.createBlog)
    .patch("/blogs/:id", auth_middleware_1.adminAuth, blogsController_1.editBlog)
    .delete("/blogs/:id", auth_middleware_1.adminAuth, blogsController_1.deleteBlog);
exports.default = router;
