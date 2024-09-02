const QuestionPaper = require('../Model/QuestionPaper')
const multer = require('multer');
const { Readable } = require('stream');
const mongoose = require('mongoose');



const generateUniqueFilename = (commonFileId, originalFilename) => {
    return `${commonFileId}_${originalFilename}`;
  };


async function UploadQuestionPaper(req,res){
    const subjectName = req.body.subjectName
    const description = req.body.description
    const degree = req.body.degree
    const year = req.body.year
    const branch = req.body.branch
    const semester = req.body.semester
    const curriculum = req.body.curriculum
    try{
        const _id = req.user._id
        const commonFileId = new mongoose.Types.ObjectId();
        const QuestionPaperData = new QuestionPaper({
        subjectName,
        description,
        degree,
        year,
        branch,
        semester,
        curriculum,
        creatorId:_id,
        file: {
            filename: generateUniqueFilename(commonFileId, req.file.originalname),
            fileId: commonFileId,
        },
      });
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "QuestionPaper",
      });
        const uniqueFilename = generateUniqueFilename(
          commonFileId,
          req.file.originalname
        );
        const readableStream = new Readable();
        readableStream.push(req.file.buffer);
        readableStream.push(null);
        const uploadStream = bucket.openUploadStream(uniqueFilename, {
          _id: commonFileId,
        });
        readableStream.pipe(uploadStream);
        await QuestionPaperData.save();
    }catch(err){
      return res.send({code:500,message:"Error"})
    }
}


async function GetRequiredQuestionPaper(req,res){
  const degree = req.query.degree
  const semester = req.query.semester
  const branch = req.query.branch
  const curriculum = req.query.curriculum
  const year = req.query.year
  try{
    const QuestionPaperData = await QuestionPaper.find({degree,semester,branch,curriculum,year})
    return res.send({code:200, message:"Success",data:QuestionPaperData})
    
  }catch(err){
    return res.send({code:500,message:"Error"})
  }
}

async function PreviewQuestionPaper(req,res){
  try {
    const { filename } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "QuestionPaper",
    });
    const downloadStream = bucket.openDownloadStreamByName(filename);
    res.set("Content-Type", "application/pdf");
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error previewing company file:", error);
    if (error.name === "FileNotFound") {
      return res.status(404).json({ error: "Company file not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function DownloadQuestionPaper(req,res){
  try {
    const { filename } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "QuestionPaper",
    });
    const downloadStream = bucket.openDownloadStreamByName(filename);
    res.set("Content-Disposition", `attachment; filename="${filename}"`);
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error downloading company file:", error);
    if (error.name === "FileNotFound") {
      return res.status(404).json({ error: "Company file not found" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}


async function GetMyQuestionPapers(req,res){
  try{
    const id = req.user._id
    const MyQuestionPapersData = await QuestionPaper.find({creatorId:id})
    if(MyQuestionPapersData){
      return res.send({code:200,message:"Success",data:MyQuestionPapersData})
    }else{
      return res.send({code:404,message:"error"})
    }
  }catch(err){
    return res.send({code:500,message:err})
  }
}

async function DeleteMyQuestionPapers(req,res){
  const {id} = req.params
  try{
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
      bucketName:'QuestionPaper'
    })
    const MyQuestionPapers = await QuestionPaper.findOne({_id:id})
    if(MyQuestionPapers){
      const QuestionPapersFileInfo = await bucket.find({ filename: MyQuestionPapers.file.filename }).toArray();
      for (const i of QuestionPapersFileInfo) {
        await bucket.delete(i._id);
      }
      await QuestionPaper.deleteOne({ _id: id });
      return res.send({code:200,message:"Deleted succesfully"})
    }else{
      return res.send({code:404,message:"File is not present"})
    }
  }catch(err){
    return res.send({code:500,message:"Error"})
  }
}
    
    

module.exports = {UploadQuestionPaper,GetRequiredQuestionPaper,PreviewQuestionPaper,DownloadQuestionPaper,GetMyQuestionPapers,DeleteMyQuestionPapers}