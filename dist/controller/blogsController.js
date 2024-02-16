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
exports.deleteBlog = exports.editBlog = exports.createBlog = exports.getOneBlog = exports.getAllBlogs = void 0;
const blog_model_1 = __importDefault(require("../model/blog_model"));
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_model_1.default.find();
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
exports.getAllBlogs = getAllBlogs;
const getOneBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_model_1.default.findOne({ _id: req.params.id });
        res.status(200).json({
            status: 'Success',
            results: post
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'The blog you are looking for is not available  ' + error
        });
    }
});
exports.getOneBlog = getOneBlog;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new blog_model_1.default({
            "title": req.body.title,
            "content": req.body.content,
        });
        yield post.save();
        res.status(201).json({
            status: 'Success',
            results: {
                title: req.body.title,
                content: req.body.content
            }
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'Failed',
            error: 'There was some error creating your blog  ' + error
        });
    }
});
exports.createBlog = createBlog;
const editBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield blog_model_1.default.findOne({ _id: req.params.id });
        if (req.body.title) {
            if (post) {
                post.title = req.body.title;
            }
        }
        if (req.body.content) {
            if (post) {
                post.content = req.body.content;
            }
            // post.content = req.body.content 
        }
        if (post) {
            yield post.save();
        }
        res.send(post);
    }
    catch (_a) {
        res.status(404).json({
            status: 'Failed',
            error: "Post doesn't Exist, Please use a valid ID"
        });
    }
});
exports.editBlog = editBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blog_model_1.default.deleteOne({ _id: req.params.id });
        res.status(204);
    }
    catch (_b) {
        res.status(404).json({
            status: 'Failed',
            error: "Post doesn't exist!"
        });
    }
});
exports.deleteBlog = deleteBlog;
