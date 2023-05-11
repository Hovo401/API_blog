import dotenv from "dotenv";
dotenv.config();
import { Request } from "express"
import jwt from 'jsonwebtoken';
import dbController from '../Db/users.bd.controller';

type token_res = { userId: number; nickname: string; message: string };

class Token{
    private  async parserToken(tokin: string ): Promise<token_res>{
        try{
            const decoded = jwt.verify(tokin, process.env.SECRET_KEY || 'my_SECRET_KEY');

            const userId = Object(decoded).userId  || -1;

            const user = await dbController.getUserById(userId);

            if(user.id === userId){
                return { userId: user.id, nickname: user.nickname, message: 'token valid' };
            }else{
                return { userId: -1, nickname: '-1', message: 'token is invalid' };
            }
        }catch(e){
            return { userId: -1, nickname: '-1', message: 'error' }
        }
    }
    async Authorization(req: Request): Promise<token_res>{

        const parserTokenResult = [
            await this.parserToken(req.headers.authorization || '.'),
            await this.parserToken(req.cookies.Authorization || '.'),
        ]
        for(let el of parserTokenResult){
            if(el.userId !== -1){
                return el;
            }
        }

        return  { userId: -1, nickname: '-1', message: 'token is invalid' }
    }

    async creatToken(id: number): Promise<string>{
        const token = jwt.sign({ userId: id }, process.env.SECRET_KEY || 'my_SECRET_KEY');
        return String(token);
    }
}

export default new Token();