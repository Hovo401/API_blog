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
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api', api_routes_1.default);
try {
    app.listen(PORT, () => {
        console.log(`Backend server started on port ${PORT}`);
    });
}
catch (e) {
    console.error(e);
}
