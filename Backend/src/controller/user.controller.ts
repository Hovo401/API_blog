import ControllerStarter from './controller.starter';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwtTokin from '../moduls/Authentication/jwt.token.modul';
import userBdController from '../moduls/Db/users.bd.controller';


class UserContreoller {
    private async login(nickname: string, password: string, res: Response): Promise<void> {
        if (!nickname || !password) { throw [401, 'wrong login || password'] }

        const user = await userBdController.getUserByNikName(nickname);
        if (!user?.nickname) { throw [401, 'User ${nickname} is not registered'];}

        const checkPassword = await bcrypt.compare(password, user?.hashpassword);
        if (!checkPassword) { throw [401, 'wrong password']}

        const tokin = await jwtTokin.creatToken(user?.id);
        res.cookie('Authorization', tokin, { httpOnly: true });
        throw [200, '', {tokin, user: { userId: user?.id, nickname: user?.nickname }}]
    }
    private async generateHash(password: string) {
        const saltRounds = 10;
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
          });
        });
      }

    async postTokenAuthentication(req: Request, res: Response): Promise<void> {
        const userInfo = await jwtTokin.Authorization(req)
        if(userInfo.userId == -1){ throw [401, userInfo.message]; }
        
        throw [200, '', {user: { userId: userInfo?.userId, nickname: userInfo?.nickname }}]
    }

    async postLogin(req: Request, res: Response): Promise<void> {
        const { nickname, password } = req.body as Record<string, string>;
        await this.login(nickname, password, res);
    }

    async postSingup(req: Request, res: Response): Promise<void> {
        const { nickname, password } = req.body;
        if (typeof nickname !== 'string' || typeof password !== 'string') { throw [400, 'missing nickname or password field'];}
        
        const user_befor = await userBdController.getUserByNikName(nickname);
        if (user_befor?.nickname) { throw [226, 'nickname is busy',{},true] }

        const hash = String(await this.generateHash(password));
        const newPersoon = await userBdController.createUser(nickname, String(hash));

        if (!newPersoon) {throw [500]}

        await this.login(nickname, password, res);
    }

    async getOneUser(req: Request, res: Response): Promise<void> {

        const req_nickname = req?.query?.nickname;
        const req_id = req?.query?.id;
        if (!req_id && !req_nickname) { throw [400, 'missing key'] }  

        const { id, nickname } = (req_id) ?
            await userBdController.getUserById(Number(req_id)) :
            await userBdController.getUserByNikName(String(req_nickname));

        if (!nickname) { throw [400, 'User is not found'];}

        throw [200,'', {user: { id, nickname }}]
    }

    async getUsers(req: Request, res: Response): Promise<void> { // dev
        const users = await userBdController.getUsers()
        throw [200, '', {users}]
    }
}


const controler = new UserContreoller ();
const starter = new ControllerStarter( controler );
export default (methodName: keyof UserContreoller) => starter.run.bind( starter )(methodName);