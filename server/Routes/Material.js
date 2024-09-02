const express = require('express')
const route = express.Router()
const MaterialController = require('../Controller/Material')
const authenticate = require('../Middleware/Authenticate')
const multer = require('multer')
const upload = multer()



route.post('/uploadmaterial',authenticate,upload.single('file'),MaterialController.UploadMaterial)
route.get('/getrequiredmaterial',authenticate,MaterialController.GetRequiredMaterial)
route.get('/previewmaterial/:filename',authenticate,MaterialController.PreviewMaterial)
route.get('/downloadmaterial/:filename',authenticate,MaterialController.DownloadMaterial)
route.get('/getmymaterial',authenticate,MaterialController.GetMyMaterial)
route.delete('/deletematerial/:id',authenticate,MaterialController.DeleteMyMaterial)


module.exports = route;