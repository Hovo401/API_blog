import ControllerStarter from './controller.starter';
import { Request, Response } from 'express';
import jwtTokin from '../moduls/Authentication/jwt.token.modul';
import postsBdController from '../moduls/Db/posts.bd.controller';


class UserPostContreoller {

    async getPosts(req: Request, res: Response): Promise<void> {
        const { start, max } = req.query;
        const req_start: number = Number(start) > 0 ? Number(start) : 0;
        const req_max:   number = Number(max) > 0   ? Number(max)   : 20;

        const posts = await postsBdController.getPosts(req_start, req_max);
        if (!posts) {throw [204];}
        throw [200, '', {posts}];
    }
    async getPostsByUserId(req: Request, res: Response): Promise<void> {
        const { user_id } = req.query;
        const req_user_id = Number(user_id);
        if (isNaN(req_user_id)) { throw [400, 'wrong user_id']; }

        const posts = await postsBdController.getPostsByUser_id(req_user_id);
        if (!posts) { throw [204]; }
        throw [200, '', {posts}];
    }
    async getPostByPost_id(req: Request, res: Response): Promise<void>{
        const { post_id } = req.query;
        const req_post_id = Number(post_id);
        if (isNaN(req_post_id)) { throw [400, 'wrong post_id']; }

        const posts = await postsBdController.getPostByPost_id(req_post_id);
        if (!posts) { throw [204]; }
        throw [200, '', {posts}];
    }

    async postCreatePost(req: Request, res: Response): Promise<void> {
        const { userId } = await jwtTokin.Authorization(req);
        if (userId == -1) { throw [400, 'user is not authorized']; }

        const { message, media_message } = req.body;
        if (!message) { throw [400]; }

        const posts = await postsBdController.createPost(Number(userId), message || '', media_message || '');
        if (!posts) {throw [204]}
        throw [200, 'post successfully created', {posts}];
    }
    async putUpdatePost(req: Request, res: Response): Promise<void>{
        const { userId } = await jwtTokin.Authorization(req);
        if (userId == -1) { throw [400, 'user is not authorized']; }

        const req_post_id = Number(req.params.post_id);
        const { message, media_message } = req.body;
        if (!message) { throw [400]; }

        const { user_id } = await postsBdController.getPostByPost_id(req_post_id);
        if (Number(user_id) !== userId) {
            throw [403, `you can't delete someone else's post `];
        }

        const posts = await postsBdController.updatePost(req_post_id, message || '', media_message || '');
        if (!posts) {throw [204]}
        throw [200, 'post successfully updated', {posts}];
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const { userId } = await jwtTokin.Authorization(req);
        if (userId == -1) { throw [400, 'user is not authorized']; }

        const req_post_id = Number(req.params.post_id);
        if (isNaN(req_post_id)) {throw [400];}

        const { user_id } = await postsBdController.getPostByPost_id(req_post_id);
        if (Number(user_id) !== userId) {
            throw [403, `you can't delete someone else's post  `]
        }

        const posts = await postsBdController.deletePost(req_post_id);
        if (!posts) {throw [204]}
        throw [200, 'post successfully deleted', {posts}]
    }

}

const controler = new UserPostContreoller ();
const starter = new ControllerStarter( controler );
export default (methodName: keyof UserPostContreoller) => starter.run.bind( starter )(methodName);