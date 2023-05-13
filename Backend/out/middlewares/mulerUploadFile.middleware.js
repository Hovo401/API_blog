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
const multer_1 = __importDefault(require("multer"));
function multerUploadFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = multer_1.default.memoryStorage();
        const upload = (0, multer_1.default)({ storage }).single('file');
        upload(req, res, function (err) {
            if (err) {
                // Обработка ошибки, если не удалось загрузить файл
                return next(err);
            }
            // Файл доступен в req.file
            next();
        });
    });
}
exports.default = multerUploadFile;
// import multer from 'multer';
// import jwtTokin from '../moduls/Authentication/jwt.token.modul';
// import { Request, Response, NextFunction } from 'express';
// async function mulerUploadFile(req: Request, res: Response, next: NextFunction){
//   const { userId } = await jwtTokin.Authorization(req);
//   const storage = multer.diskStorage({
//     destination: 'public/'+userId,
//     filename: function(req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       const originalName = file.originalname;
//       const fileName = originalName.substring(0, originalName.lastIndexOf('.')); // Берем имя файла без расширения
//       const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла
//       cb(null, fileName + '-' + uniqueSuffix + fileExtension);
//     }
//   });
//    multer({ storage: storage }).single('file')(req, res, next);
// }
//   export default mulerUploadFile
