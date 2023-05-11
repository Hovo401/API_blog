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
const bd_1 = __importDefault(require("./bd"));
class Db_posts {
    getPosts(starting = 0, end = Infinity) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`select * from posts whwre id BETWEEN $1 AND $2;`, [starting, end]);
            return query.rows;
        });
    }
    chratPost(iserId, message, mediaMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`select * from users where (nickname = $1 , hashPassword = $2)`);
            return 'creat';
        });
    }
}
exports.default = Db_posts;
