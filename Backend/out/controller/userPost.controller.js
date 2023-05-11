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
const posts_bd_controller_1 = __importDefault(require("../moduls/Db/posts.bd.controller"));
function response(res, apiResponse, status = 200) {
    res.status(status).json({
        error: apiResponse.error || false,
        message: apiResponse.message || '',
        body: apiResponse.body || {}
    });
}
class UserPostContreoller {
    getPosts(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield posts_bd_controller_1.default.getPosts(Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.start), Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.end));
            if (query) {
                response(res, { body: { posts: query } });
            }
            else {
                response(res, {}, 500);
            }
        });
    }
}
const controler = new UserPostContreoller();
const run = (methodName) => {
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield controler[methodName](req, res);
            }
            catch (e) {
                response(res, {
                    error: true,
                    body: JSON.stringify(e),
                }, 500);
            }
        });
    };
};
exports.default = run;
