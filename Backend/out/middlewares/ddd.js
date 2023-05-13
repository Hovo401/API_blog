"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: 'public/',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalName = file.originalname;
        const fileName = originalName.substring(0, originalName.lastIndexOf('.')); // Берем имя файла без расширения
        const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла
        cb(null, fileName + '-' + uniqueSuffix + fileExtension);
    }
});
const mulerUploadFile = (0, multer_1.default)({ storage: storage });
exports.default = mulerUploadFile;
