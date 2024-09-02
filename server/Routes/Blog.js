const express = require('express')
const route = express.Router()
const BlogController = require('../Controller/Blog')
const authenticate = require('../Middleware/Authenticate')
const multer = require('multer')
const upload = multer()



route.post('/updateblog/:id',authenticate,upload.array('images'),BlogController.UpdateBlog)
route.post('/write-blog',authenticate,upload.array('images'),BlogController.CreateNewBlog)
route.get('/getallblogs',authenticate,BlogController.GetAllBlogs)
route.get('/myblogs',authenticate,BlogController.GetMyBlogs)
route.delete('/deleteblog/:id',authenticate,BlogController.DeleteBlog)

module.exports = route;