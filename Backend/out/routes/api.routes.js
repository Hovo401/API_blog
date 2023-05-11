"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const post_controller_1 = __importDefault(require("../controller/post.controller"));
const router = (0, express_1.default)();
router.post('/login', (0, user_controller_1.default)('postLogin'));
router.post('/singup', (0, user_controller_1.default)('postSingup'));
router.post('/checkTokin', (0, user_controller_1.default)('postTokenAuthentication'));
router.get('/getUsers', (0, user_controller_1.default)('getUsers')); // dev
router.get('/getOneUser', (0, user_controller_1.default)('getOneUser'));
router.get('/getPosts', (0, post_controller_1.default)('getPosts'));
router.get('/getPostsByUserId', (0, post_controller_1.default)('getPostsByUserId'));
router.get('/getPostByPost_id', (0, post_controller_1.default)('getPostByPost_id'));
router.post('/createPost', (0, post_controller_1.default)('postCreatePost'));
router.put('/updatePost/:post_id', (0, post_controller_1.default)('putUpdatePost'));
router.delete('/post/:post_id', (0, post_controller_1.default)("deletePost"));
exports.default = router;
