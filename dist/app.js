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
const mongoose_1 = __importDefault(require("mongoose"));
const blogs_routes_1 = __importDefault(require("./routes/blogs_routes"));
const users_routes_1 = __importDefault(require("./routes/users_routes"));
const bodyParser = require("body-parser");
require("dotenv/config");
const app = (0, express_1.default)();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Connect to MongoDB database
mongoose_1.default
    .connect(`${process.env.DB}`)
    .then(() => { console.log('DB connected'); })
    .catch(err => console.log(err));
const port = process.env.PORT || 3005;
app.listen(port, function () {
    app.get('/test', (req, res) => __awaiter(this, void 0, void 0, function* () {
        console.log(port);
        res.send({
            status: 200,
            message: 'Looks Okay to me',
            port
        });
    }));
    app.use('/api', blogs_routes_1.default);
    app.use('/api', users_routes_1.default);
    console.log('the server is running on port' + `  ${port}`);
});
