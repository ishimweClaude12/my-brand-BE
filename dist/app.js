"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogs_routes_1 = __importDefault(require("./routes/blogs_routes"));
const users_routes_1 = __importDefault(require("./routes/users_routes"));
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const comments_routes_1 = __importDefault(require("./routes/comments_routes"));
//import likeController from './controller/likeController';
const like_route_1 = __importDefault(require("./routes/like_route"));
const app = (0, express_1.default)();
// Use Cors 
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Cookie parser to store the token
app.use((0, cookie_parser_1.default)());
// Connect to MongoDB database
mongoose_1.default
    .connect(process.env.DB)
    .then(() => { console.log('DB connected'); })
    .catch(err => console.log("Can not connect", err));
const port = process.env.PORT || 3005;
app.listen(port, function () {
    app.use('/api', blogs_routes_1.default);
    app.use('/api', users_routes_1.default);
    app.use('/api', comments_routes_1.default);
    app.use('/api', like_route_1.default);
    console.log('the server is running on port' + `  ${port}`);
});
exports.default = app;
