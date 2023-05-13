"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
const publicPath = path_1.default.join(__dirname, '../public');
app.use('/public', express_1.default.static(publicPath));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {
        next();
    }
});
app.use('/api', api_routes_1.default);
try {
    app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`);
    });
}
catch (e) {
    console.error(e);
}
