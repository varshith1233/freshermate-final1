const express = require('express')
const route = express.Router()
const QuestionPaperController = require('../Controller/QuestionPaper')
const authenticate = require('../Middleware/Authenticate')
const multer = require('multer')
const upload = multer()



route.post('/uploadquestionpaper',authenticate,upload.single('file'),QuestionPaperController.UploadQuestionPaper)
route.get('/getrequiredquestionpaper',authenticate,QuestionPaperController.GetRequiredQuestionPaper)
route.get('/previewquestionpaper/:filename',authenticate,QuestionPaperController.PreviewQuestionPaper)
route.get('/downloadquestionpaper/:filename',authenticate,QuestionPaperController.DownloadQuestionPaper)
route.get('/getmyquestionpapers',authenticate,QuestionPaperController.GetMyQuestionPapers)
route.delete('/deletequestionpaper/:id',authenticate,QuestionPaperController.DeleteMyQuestionPapers)


module.exports = route;