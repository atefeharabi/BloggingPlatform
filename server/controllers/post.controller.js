import Post from '../models/post.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './../helpers/dbErrorHandler.js'
import formidable from 'formidable'
import fs from 'fs'
//import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  console.log("no create");
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let post = new Post(fields)
    post.author= req.profile
    
    try {
      let result = await post.save()
      res.status(200).json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const postByID = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate('author', '_id subject').exec()
    if (!post)
      return res.status('400').json({
        error: "Post not found"
      })
    req.post = post
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve post"
    })
  }
}

// const photo = (req, res, next) => {
//   if(req.shop.image.data){
//     res.set("Content-Type", req.shop.image.contentType)
//     return res.send(req.shop.image.data)
//   }
//   next()
// }
// const defaultPhoto = (req, res) => {
//   //return res.sendFile(process.cwd()+defaultImage)
//   return null
// }

const read = (req, res) => {
  req.shop.image = undefined
  return res.json(req.shop)
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields) => {
    let post = req.post
    post = extend(post, fields)
    post.updated = Date.now()
    try {
      let result = await post.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    let post = req.post
    let deletedPost = post.remove()
    res.json(deletedPost)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }  
}

const list = async (req, res) => {
  try {
    let posts = await Post.find()
    res.json(posts)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByOwner = async (req, res) => {
  try {
    let posts = await Post.find({author: req.profile._id}).populate('author', '_id name')
    res.json(posts)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.post && req.auth && req.post.author._id == req.auth._id
  if(!isOwner){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  postByID,  
  list,
  listByOwner,
  update,
  isOwner,
  remove, 
  read
}
