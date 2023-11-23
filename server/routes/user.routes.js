import express from 'express';
import User from '../models/user.model.js';
//import extend from 'lodash/extend';
import errorHandler from '../controllers/error.controller.js';

const router = express.Router();

router.route('/api/users')
  .post(create)
  .get(list);

router.route('/api/users/:userId')
  .get(read)
  .put(update)
  .delete(remove);

router.param('userId', userByID);

export default router;

async function create(req, res) {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({
      message: "Successfully signed up!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

async function list(req, res) {
  try {
    let users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

async function userByID(req, res, next, id) {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: "User not found"
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    });
  }
}

function read(req, res) {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
}

async function update(req, res) {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}

async function remove(req, res) {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
}