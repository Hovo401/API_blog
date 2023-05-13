
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

async function multerUploadFile(req: Request, res: Response, next: NextFunction) {
  
  const storage = multer.memoryStorage();

  const upload = multer({ storage }).single('file');

  upload(req, res, function (err) {
    if (err) {
      // Обработка ошибки, если не удалось загрузить файл
      return next(err);
    }

    // Файл доступен в req.file
    next();
  });
}

export default multerUploadFile;





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