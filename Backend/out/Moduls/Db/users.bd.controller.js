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
class db_users {
    getUserByNikName(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`select * from users where nickname = $1`, [nickname]);
            return query.rows[0];
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`select * from users where id = $1`, [id]);
            return query.rows[0];
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`select id, nickname from users;`);
            return query.rows;
        });
    }
    createUser(nickname, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`INSERT INTO users (nickname, hashpassword) values ($1, $2) RETURNING *`, [nickname, hashPassword]);
            return query.rows[0];
        });
    }
}
exports.default = new db_users();
