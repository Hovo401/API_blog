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
const controller_starter_1 = __importDefault(require("./controller.starter"));
const jwt_token_modul_1 = __importDefault(require("../moduls/Authentication/jwt.token.modul"));
const posts_bd_controller_1 = __importDefault(require("../moduls/Db/posts.bd.controller"));
class UserPostContreoller {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { start, max } = req.query;
            const req_start = Number(start) > 0 ? Number(start) : 0;
            const req_max = Number(max) > 0 ? Number(max) : 20;
            const posts = yield posts_bd_controller_1.default.getPosts(req_start, req_max);
            if (!posts) {
                throw [204];
            }
            throw [200, '', { posts }];
        });
    }
    getPostsByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = req.query;
            const req_user_id = Number(user_id);
            if (isNaN(req_user_id)) {
                throw [400, 'wrong user_id'];
            }
            const posts = yield posts_bd_controller_1.default.getPostsByUser_id(req_user_id);
            if (!posts) {
                throw [204];
            }
            throw [200, '', { posts }];
        });
    }
    getPostByPost_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { post_id } = req.query;
            const req_post_id = Number(post_id);
            if (isNaN(req_post_id)) {
                throw [400, 'wrong post_id'];
            }
            const posts = yield posts_bd_controller_1.default.getPostByPost_id(req_post_id);
            if (!posts) {
                throw [204];
            }
            throw [200, '', { posts }];
        });
    }
    postCreatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield jwt_token_modul_1.default.Authorization(req);
            if (userId == -1) {
                throw [400, 'user is not authorized'];
            }
            const { message, media_message } = req.body;
            if (!message) {
                throw [400];
            }
            const posts = yield posts_bd_controller_1.default.createPost(Number(userId), message || '', media_message || '');
            if (!posts) {
                throw [204];
            }
            throw [200, 'post successfully created', { posts }];
        });
    }
    putUpdatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield jwt_token_modul_1.default.Authorization(req);
            if (userId == -1) {
                throw [400, 'user is not authorized'];
            }
            const req_post_id = Number(req.params.post_id);
            const { message, media_message } = req.body;
            if (!message) {
                throw [400];
            }
            const { user_id } = yield posts_bd_controller_1.default.getPostByPost_id(req_post_id);
            if (Number(user_id) !== userId) {
                throw [403, `you can't delete someone else's post `];
            }
            const posts = yield posts_bd_controller_1.default.updatePost(req_post_id, message || '', media_message || '');
            if (!posts) {
                throw [204];
            }
            throw [200, 'post successfully updated', { posts }];
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield jwt_token_modul_1.default.Authorization(req);
            if (userId == -1) {
                throw [400, 'user is not authorized'];
            }
            const req_post_id = Number(req.params.post_id);
            if (isNaN(req_post_id)) {
                throw [400];
            }
            const { user_id } = yield posts_bd_controller_1.default.getPostByPost_id(req_post_id);
            if (Number(user_id) !== userId) {
                throw [403, `you can't delete someone else's post  `];
            }
            const posts = yield posts_bd_controller_1.default.deletePost(req_post_id);
            if (!posts) {
                throw [204];
            }
            throw [200, 'post successfully deleted', { posts }];
        });
    }
}
const controler = new UserPostContreoller();
const starter = new controller_starter_1.default(controler);
exports.default = (methodName) => starter.run.bind(starter)(methodName);
