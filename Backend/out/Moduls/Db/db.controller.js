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
const dp_1 = __importDefault(require("./dp"));
class db {
    getUserByNikName(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield dp_1.default.query(`select * from users where nickname = $1`, [nickname]);
            return query.rows[0];
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield dp_1.default.query(`select * from users where id = $1`, [id]);
            return query.rows[0];
        });
    }
    getUsers(nickname, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield dp_1.default.query(`select * from users;`);
            return query.rows;
        });
    }
    checkLoign(nickname, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield dp_1.default.query(`select * from users where (nickname = $1 , hashPassword = $2)`, [nickname, hashPassword]);
            if (nickname === query.rows[0].nickname && hashPassword === query.rows[0].hashPassword) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    chratPost(iserId, message, mediaMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield dp_1.default.query(`select * from users where (nickname = $1 , hashPassword = $2)`, [nickname, hashPassword]);
            if (nickname === query.rows[0].nickname && hashPassword === query.rows[0].hashPassword) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = new db();
