// server/routes/blogPost.routes.js
import express from 'express';
import blogPostCtrl from '../controllers/blogPost.controller.js';

const router = express.Router();

router.route('/api/blogPosts')
  .get(blogPostCtrl.list)
  .post(blogPostCtrl.create);

router.route('/api/blogPosts/:blogPostId')
  .get(blogPostCtrl.read)
  .put(blogPostCtrl.update)
  .delete(blogPostCtrl.remove);

router.param('blogPostId', blogPostCtrl.blogPostByID);

export default router;
