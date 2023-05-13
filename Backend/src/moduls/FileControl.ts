import  fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';


async function addPostMedia(file: any, user_id: number, post_id: number): Promise<string> {

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.originalname;
    const fileName = originalName.substring(0, originalName.lastIndexOf('.')); // Берем имя файла без расширения
    const fileExtension = originalName.substring(originalName.lastIndexOf('.')); // Берем расширение файла

    const filePath = path.join('public', String(user_id), String(post_id));
    const fileNume = `${fileName}-${uniqueSuffix}${fileExtension}`;
    const fullFilePath = path.join( filePath, fileNume );

    const made = await mkdirp(filePath);

    await fs.writeFile( fullFilePath , file.buffer, (err) => {});

    return fullFilePath;
}
function deleteFolder(folderPath: string) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const currentPath = `${folderPath}/${file}`;
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteFolder(currentPath); // Рекурсивно удалить вложенные папки
      } else {
        fs.unlinkSync(currentPath); // Удалить файл
      }
    });
    fs.rmdirSync(folderPath); // Удалить саму папку
    console.log(`Папка ${folderPath} успешно удалена.`);
  } else {
    console.log(`Папка ${folderPath} не существует.`);
  }
}

export {addPostMedia, deleteFolder}
