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
    parserToken(tokin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(tokin, process.env.SECRET_KEY || 'my_SECRET_KEY');
                const userId = Object(decoded).userId || -1;
                const user = yield users_bd_controller_1.default.getUserById(userId);
                if (user.id === userId) {
                    return { userId: user.id, nickname: user.nickname, message: 'token valid' };
                }
                else {
                    return { userId: -1, nickname: '-1', message: 'token is invalid' };
                }
            }
            catch (e) {
                return { userId: -1, nickname: '-1', message: 'error' };
            }
        });
    }
    Authorization(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const parserTokenResult = [
                yield this.parserToken(req.headers.authorization || '.'),
                yield this.parserToken(req.cookies.Authorization || '.'),
            ];
            for (let el of parserTokenResult) {
                if (el.userId !== -1) {
                    return el;
                }
            }
            return { userId: -1, nickname: '-1', message: 'token is invalid' };
        });
    }
    creatToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: id }, process.env.SECRET_KEY || 'my_SECRET_KEY');
            return String(token);
        });
    }
}
exports.default = new Token();
