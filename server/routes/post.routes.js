import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import postCtrl from '../controllers/post.controller.js'

const router = express.Router()

router.route('/api/posts')
  .get(postCtrl.list)

router.route('/api/post/:postId')
  .get(postCtrl.read)

router.route('/api/posts/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, postCtrl.listByOwner)

router.route('/api/posts/:postId')
  .put(authCtrl.requireSignin, postCtrl.isOwner, postCtrl.update)
  .delete(authCtrl.requireSignin, postCtrl.isOwner, postCtrl.remove)

// router.route('/api/shops/logo/:shopId')
//   .get(shopCtrl.photo, shopCtrl.defaultPhoto)

// router.route('/api/shops/defaultphoto')
//   .get(shopCtrl.defaultPhoto)

router.param('postId', postCtrl.postByID)
router.param('userId', userCtrl.userByID)

export default router
