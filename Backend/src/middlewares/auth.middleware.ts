import jwtTokin from '../moduls/Authentication/jwt.token.modul';
import { Request, Response, NextFunction } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = await jwtTokin.Authorization(req);
    if (userId == -1) {
      
      throw [400, 'user is not authorized'];
    }
    // req.userId = userId; // Добавляем userId к объекту запроса для использования в других обработчиках
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
