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
exports.deleteFolder = exports.addPostMedia = void 0;
const fs_1 = __importDefault(require("fs"));
const mkdirp_1 = require("mkdirp");
const path_1 = __importDefault(require("path"));
function addPostMedia(file, user_id, post_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = file.originalname;
        const fileName = originalName.substring(0, originalName.lastIndexOf('.')); // Берем имя файла без расширения
        const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла
        const filePath = path_1.default.join('public', String(user_id), String(post_id));
        const fileNume = `${fileName}-${uniqueSuffix}${fileExtension}`;
        const fullFilePath = path_1.default.join(filePath, fileNume);
        const made = yield (0, mkdirp_1.mkdirp)(filePath);
        yield fs_1.default.writeFile(fullFilePath, file.buffer, (err) => { });
        return fullFilePath;
    });
}
exports.addPostMedia = addPostMedia;
function deleteFolder(folderPath) {
    if (fs_1.default.existsSync(folderPath)) {
        fs_1.default.readdirSync(folderPath).forEach((file) => {
            const currentPath = `${folderPath}/${file}`;
            if (fs_1.default.lstatSync(currentPath).isDirectory()) {
                deleteFolder(currentPath); // Рекурсивно удалить вложенные папки
            }
            else {
                fs_1.default.unlinkSync(currentPath); // Удалить файл
            }
        });
        fs_1.default.rmdirSync(folderPath); // Удалить саму папку
    }
    else {
    }
}
exports.deleteFolder = deleteFolder;
