import Router from 'express';

import authMiddleware from '../middlewares/auth.middleware'
import mulerUploadFile from '../middlewares/mulerUploadFile.middleware';

import userControler from '../controller/user.controller';
import postControler from '../controller/post.controller'
import ControllerStarter from '../controller/controller.starter'


const router = Router();
 

router.post('/login', userControler('postLogin'));
router.post('/singup', userControler('postSingup'));
router.post('/checkTokin', authMiddleware, userControler('postTokenAuthentication'))

router.get('/getUsers', userControler('getUsers'));// dev
router.get('/getOneUser', userControler('getOneUser'));

router.get('/getPosts', postControler('getPosts'));
router.get('/getPostsByUserId', postControler('getPostsByUserId'));
router.get('/getPostByPost_id', postControler('getPostByPost_id'));
router.get('/getPostLength', postControler('getPostLength'));

router.post('/createPost', authMiddleware, mulerUploadFile, postControler('postCreatePost'));
router.put('/updatePost/:post_id', authMiddleware, mulerUploadFile, postControler('putUpdatePost'));
router.delete('/post/:post_id', authMiddleware, postControler("deletePost"));

router.all('*', (req, res) => {
  ControllerStarter.resArr(res, [404, 'Route not found', {}, true]);
});

export default router; 