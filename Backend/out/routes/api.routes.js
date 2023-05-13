"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const mulerUploadFile_middleware_1 = __importDefault(require("../middlewares/mulerUploadFile.middleware"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const post_controller_1 = __importDefault(require("../controller/post.controller"));
const controller_starter_1 = __importDefault(require("../controller/controller.starter"));
const router = (0, express_1.default)();
router.post('/login', (0, user_controller_1.default)('postLogin'));
router.post('/singup', (0, user_controller_1.default)('postSingup'));
router.post('/checkTokin', auth_middleware_1.default, (0, user_controller_1.default)('postTokenAuthentication'));
router.get('/getUsers', (0, user_controller_1.default)('getUsers')); // dev
router.get('/getOneUser', (0, user_controller_1.default)('getOneUser'));
router.get('/getPosts', (0, post_controller_1.default)('getPosts'));
router.get('/getPostsByUserId', (0, post_controller_1.default)('getPostsByUserId'));
router.get('/getPostByPost_id', (0, post_controller_1.default)('getPostByPost_id'));
router.get('/getPostLength', (0, post_controller_1.default)('getPostLength'));
router.post('/createPost', auth_middleware_1.default, mulerUploadFile_middleware_1.default, (0, post_controller_1.default)('postCreatePost'));
router.put('/updatePost/:post_id', auth_middleware_1.default, mulerUploadFile_middleware_1.default, (0, post_controller_1.default)('putUpdatePost'));
router.delete('/post/:post_id', auth_middleware_1.default, (0, post_controller_1.default)("deletePost"));
router.all('*', (req, res) => {
    controller_starter_1.default.resArr(res, [404, 'Route not found', {}, true]);
});
exports.default = router;
