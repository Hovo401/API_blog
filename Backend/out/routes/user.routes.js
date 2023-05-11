"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = (0, express_1.default)();
router.post('/login', (0, user_controller_1.default)('postLogin'));
router.post('/singup', (0, user_controller_1.default)('postSingup'));
router.post('/checkTokin', (0, user_controller_1.default)('postCheckTokin'));
router.post('/creatpost', (0, user_controller_1.default)('postCreatPost'));
router.get('/getUsers', (0, user_controller_1.default)('getUsers'));
router.get('/getOneUser', (0, user_controller_1.default)('getOneUser'));
exports.default = router;
