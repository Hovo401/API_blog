import Router from 'express';
import {body} from 'express-validator';
import userControler from '../controller/user.controller';
import postControler from '../controller/post.controller'

const router = Router();



router.post('/login',  userControler('postLogin'));
router.post('/singup',  userControler('postSingup'));
router.post('/checkTokin', userControler('postTokenAuthentication'))

router.get('/getUsers', userControler('getUsers'));// dev
router.get('/getOneUser', userControler('getOneUser'));


router.get('/getPosts', postControler('getPosts'));
router.get('/getPostsByUserId', postControler('getPostsByUserId'));
router.get('/getPostByPost_id', postControler('getPostByPost_id'));

router.post('/createPost', postControler('postCreatePost'));
router.put('/updatePost/:post_id', postControler('putUpdatePost'));
router.delete('/post/:post_id', postControler("deletePost"));


export default router;