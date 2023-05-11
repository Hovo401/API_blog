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
    getPosts(start = 0, max = Infinity) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`SELECT * FROM posts LIMIT $1 OFFSET $2;`, [max, start]);
            return query.rows;
        });
    }
    getPostByPost_id(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`SELECT * FROM posts WHERE post_id = $1 `, [post_id]);
            return query.rows[0];
        });
    }
    getPostsByUser_id(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`SELECT * FROM posts WHERE user_id = $1 `, [user_id]);
            return query.rows;
        });
    }
    createPost(user_id, message, media_message = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`INSERT INTO posts (user_id, message, media_message) values ($1, $2, $3) RETURNING *`, [user_id, message, media_message]);
            return query.rows;
        });
    }
    deletePost(post_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`DELETE FROM posts WHERE post_id = $1`, [post_id]);
            return query.rows;
        });
    }
    updatePost(post_id, message, media_message = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield bd_1.default.query(`UPDATE posts SET message = $2, media_message = $3 WHERE post_id = $1`, [post_id, message, media_message]);
            return query.rows;
        });
    }
}
exports.default = new Db_posts();
