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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_bd_controller_1 = __importDefault(require("../Db/users.bd.controller"));
class Token {
    checkTokin(tokin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(tokin, process.env.SECRET_KEY || 'my_SECRET_KEY');
                console.log(decoded);
                const result = yield users_bd_controller_1.default.getUserById(Number(decoded));
                if (result.id === decoded) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                // console.log(e)
                return false;
            }
        });
    }
    checkAuthorization(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const headers_authorization = yield this.checkTokin(req.headers.Authorization || '.');
                const cookies_authorization = yield this.checkTokin(req.cookies.Authorization || '.');
                if (headers_authorization || cookies_authorization) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
    }
    creatTokin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'my-secret-key');
            return token;
        });
    }
}
// const token = jwt.sign( '5' , 'my-secret-key');
exports.default = new Token();
