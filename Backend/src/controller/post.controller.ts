import ControllerStarter from './controller.starter';
import { Request, Response, NextFunction } from 'express';
import jwtTokin from '../moduls/Authentication/jwt.token.modul';
import postsBdController from '../moduls/Db/posts.bd.controller';
import { addPostMedia, deleteFolder } from '../moduls/FileControl'
import path from 'path';


class UserPostContreoller {

    async getPosts(req: Request, res: Response): Promise<void> {
        const { start, max } = req.query;
        const req_start: number = Number(start) > 0 ? Number(start) : 0;
        const req_max: number = Number(max) > 0 ? Number(max) : 20;

        const posts = await postsBdController.getPosts(req_start, req_max);
        if (!posts) { throw [204]; }
        throw [200, '', { posts }];
    }
    async getPostsByUserId(req: Request, res: Response): Promise<void> {
        const { user_id } = req.query;
        const req_user_id = Number(user_id);
        if (isNaN(req_user_id)) { throw [400, 'wrong user_id']; }

        const posts = await postsBdController.getPostsByUser_id(req_user_id);
        if (!posts) { throw [204]; }
        throw [200, '', { posts }];
    }
    async getPostByPost_id(req: Request, res: Response): Promise<void> {
        const { post_id } = req.query;
        const req_post_id = Number(post_id);
        if (isNaN(req_post_id)) { throw [400, 'wrong post_id']; }

        const posts = await postsBdController.getPostByPost_id(req_post_id);
        if (!posts) { throw [204] }
        throw [200, '', { posts }];
    }
    async getPostLength(req: Request, res: Response): Promise<void>{
        const Length = await postsBdController.getPostLength();
        if (!Length[0]?.total_rows) { throw [204] }
        throw [200, '', { Length: Length[0]?.total_rows }];
    }


    async postCreatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { userId } = await jwtTokin.Authorization(req);

        let message = '';
        let media_message = '';

        if (req.headers['content-type']?.includes('multipart/form-data')) {
            message = JSON.parse(req.body?.data).message;
        } else {
            message = req.body.message;
        }

        if (!message) {
            throw [400, 'Unable to save without a message'];
        }

        const post = await postsBdController.createPost(Number(userId), message || '', media_message || '');
        const post_id = post[0]?.post_id;
        if (!post || !post_id) {
            throw [204];
        }

        if (req.headers['content-type']?.includes('multipart/form-data'), req.file) {
            const media_message = await addPostMedia(req.file, userId, post[0]?.post_id);
            const postUpload = await postsBdController.updatePost({ post_id, media_message });
        }

        throw [200, 'Post successfully created', { post }];
    }
    async putUpdatePost(req: Request, res: Response): Promise<void> {

        const { userId } = await jwtTokin.Authorization(req);
        if (userId == -1) { throw [400, 'user is not authorized']; }

        let message = '';
        let media_message = '';

        if (req.headers['content-type']?.includes('multipart/form-data')) {
            message = JSON.parse(req.body?.data).message;
        } else {
            message = req.body.message;
        }
        if (!message) { throw [400]; }
        const req_post_id = Number(req.params.post_id);
        
        const old_post = await postsBdController.getPostByPost_id(req_post_id);
        const post_id = Number(old_post?.post_id);

        if (old_post.user_id !== userId) {
            throw [403, `you can't delete someone else's post `];
        }

        let newPost ;
        if (req.headers['content-type']?.includes('multipart/form-data'), req.file) {
            deleteFolder(path.join('public', String(userId), String(req_post_id)))
            media_message = await addPostMedia(req.file, userId, old_post[0]?.post_id);
            newPost = await postsBdController.updatePost({ post_id, media_message, message });
        } else {
            newPost = await postsBdController.updatePost({ post_id, message });
        }
        // const old_post = await postsBdController.getPostByPost_id(req_post_id)
        if (!newPost) { throw [204] }
        throw [200, 'post successfully updated', { post:newPost }];
    }

    async deletePost(req: Request, res: Response): Promise<void> {
        const { userId } = await jwtTokin.Authorization(req);
        if (userId == -1) { throw [400, 'user is not authorized']; }

        const req_post_id = Number(req.params.post_id);
        if (isNaN(req_post_id)) { throw [400]; }

        const { user_id, media_message } = await postsBdController.getPostByPost_id(req_post_id);
        if (Number(user_id) !== userId) {
            throw [403, `you can't delete someone else's post  `]
        }
        if (media_message) {
            deleteFolder(path.join('public', String(userId), String(req_post_id)))
        }

        const posts = await postsBdController.deletePost(req_post_id);
        if (!posts) { throw [204] }
        throw [200, 'post successfully deleted', { posts }]
    }

}

const controler = new UserPostContreoller();
const starter = new ControllerStarter(controler);
export default (methodName: keyof UserPostContreoller) => starter.run.bind(starter)(methodName);