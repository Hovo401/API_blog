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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_token_modul_1 = __importDefault(require("../moduls/Authentication/jwt.token.modul"));
const users_bd_controller_1 = __importDefault(require("../moduls/Db/users.bd.controller"));
class UserContreoller {
    login(nickname, password, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(res);
            if (!nickname || !password) {
                throw [401, 'wrong login || password'];
            }
            const user = yield users_bd_controller_1.default.getUserByNikName(nickname);
            if (!(user === null || user === void 0 ? void 0 : user.nickname)) {
                throw [401, 'User ${nickname} is not registered'];
            }
            const checkPassword = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.hashpassword);
            if (!checkPassword) {
                throw [401, 'wrong password'];
            }
            const tokin = yield jwt_token_modul_1.default.creatToken(user === null || user === void 0 ? void 0 : user.id);
            res.cookie('Authorization', tokin, { httpOnly: true });
            throw [200, '', { tokin, user: { userId: user === null || user === void 0 ? void 0 : user.id, nickname: user === null || user === void 0 ? void 0 : user.nickname } }];
        });
    }
    generateHash(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const saltRounds = 10;
            return new Promise((resolve, reject) => {
                bcrypt_1.default.hash(password, saltRounds, (err, hash) => {
                    if (err)
                        reject(err);
                    resolve(hash);
                });
            });
        });
    }
    postTokenAuthentication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield jwt_token_modul_1.default.Authorization(req);
            if (userInfo.userId == -1) {
                throw [401, userInfo.message];
            }
            throw [200, '', { user: { userId: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userId, nickname: userInfo === null || userInfo === void 0 ? void 0 : userInfo.nickname } }];
        });
    }
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, password } = req.body;
            yield this.login(nickname, password, res);
        });
    }
    postSingup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, password } = req.body;
            if (typeof nickname !== 'string' || typeof password !== 'string') {
                throw [400, 'missing nickname or password field'];
            }
            const user_befor = yield users_bd_controller_1.default.getUserByNikName(nickname);
            if (user_befor === null || user_befor === void 0 ? void 0 : user_befor.nickname) {
                throw [226, 'nickname is busy', {}, true];
            }
            const hash = String(yield this.generateHash(password));
            const newPersoon = yield users_bd_controller_1.default.createUser(nickname, String(hash));
            if (!newPersoon) {
                throw [500];
            }
            yield this.login(nickname, password, res);
        });
    }
    getOneUser(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const req_nickname = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.nickname;
            const req_id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
            if (!req_id && !req_nickname) {
                throw [400, 'missing key'];
            }
            const { id, nickname } = (req_id) ?
                yield users_bd_controller_1.default.getUserById(Number(req_id)) :
                yield users_bd_controller_1.default.getUserByNikName(String(req_nickname));
            if (!nickname) {
                throw [400, 'User is not found'];
            }
            throw [200, '', { user: { id, nickname } }];
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield users_bd_controller_1.default.getUsers();
            throw [200, '', { users }];
        });
    }
}
const controler = new UserContreoller();
const starter = new controller_starter_1.default(controler);
exports.default = (methodName) => starter.run.bind(starter)(methodName);
