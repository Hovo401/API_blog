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
const FileControl_1 = require("../moduls/FileControl");
const path_1 = __importDefault(require("path"));
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
    getPostLength(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const Length = yield posts_bd_controller_1.default.getPostLength();
            if (!((_a = Length[0]) === null || _a === void 0 ? void 0 : _a.total_rows)) {
                throw [204];
            }
            throw [200, '', { Length: (_b = Length[0]) === null || _b === void 0 ? void 0 : _b.total_rows }];
        });
    }
    postCreatePost(req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield jwt_token_modul_1.default.Authorization(req);
            let message = '';
            let media_message = '';
            if ((_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('multipart/form-data')) {
                message = JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.data).message;
            }
            else {
                message = req.body.message;
            }
            if (!message) {
                throw [400, 'Unable to save without a message'];
            }
            const post = yield posts_bd_controller_1.default.createPost(Number(userId), message || '', media_message || '');
            const post_id = (_c = post[0]) === null || _c === void 0 ? void 0 : _c.post_id;
            if (!post || !post_id) {
                throw [204];
            }
            if ((_d = req.headers['content-type']) === null || _d === void 0 ? void 0 : _d.includes('multipart/form-data'), req.file) {
                const media_message = yield (0, FileControl_1.addPostMedia)(req.file, userId, (_e = post[0]) === null || _e === void 0 ? void 0 : _e.post_id);
                const postUpload = yield posts_bd_controller_1.default.updatePost({ post_id, media_message });
            }
            throw [200, 'Post successfully created', { post }];
        });
    }
    putUpdatePost(req, res) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = yield jwt_token_modul_1.default.Authorization(req);
            if (userId == -1) {
                throw [400, 'user is not authorized'];
            }
            let message = '';
            let media_message = '';
            if ((_a = req.headers['content-type']) === null || _a === void 0 ? void 0 : _a.includes('multipart/form-data')) {
                message = JSON.parse((_b = req.body) === null || _b === void 0 ? void 0 : _b.data).message;
            }
            else {
                message = req.body.message;
            }
            if (!message) {
                throw [400];
            }
            const req_post_id = Number(req.params.post_id);
            const old_post = yield posts_bd_controller_1.default.getPostByPost_id(req_post_id);
            const post_id = Number(old_post === null || old_post === void 0 ? void 0 : old_post.post_id);
            if (old_post.user_id !== userId) {
                throw [403, `you can't delete someone else's post `];
            }
            let newPost;
            if ((_c = req.headers['content-type']) === null || _c === void 0 ? void 0 : _c.includes('multipart/form-data'), req.file) {
                (0, FileControl_1.deleteFolder)(path_1.default.join('public', String(userId), String(req_post_id)));
                media_message = yield (0, FileControl_1.addPostMedia)(req.file, userId, (_d = old_post[0]) === null || _d === void 0 ? void 0 : _d.post_id);
                newPost = yield posts_bd_controller_1.default.updatePost({ post_id, media_message, message });
            }
            else {
                newPost = yield posts_bd_controller_1.default.updatePost({ post_id, message });
            }
            // const old_post = await postsBdController.getPostByPost_id(req_post_id)
            if (!newPost) {
                throw [204];
            }
            throw [200, 'post successfully updated', { post: newPost }];
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
            const { user_id, media_message } = yield posts_bd_controller_1.default.getPostByPost_id(req_post_id);
            if (Number(user_id) !== userId) {
                throw [403, `you can't delete someone else's post  `];
            }
            if (media_message) {
                (0, FileControl_1.deleteFolder)(path_1.default.join('public', String(userId), String(req_post_id)));
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
