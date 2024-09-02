const Material = require('../Model/Material')
const multer = require('multer');
const { Readable } = require('stream');
const mongoose = require('mongoose');



const generateUniqueFilename = (commonFileId, originalFilename) => {
    return `${commonFileId}_${originalFilename}`;
  };


async function UploadMaterial(req,res){
    const subjectName = req.body.subjectName
    const description = req.body.description
    const degree = req.body.degree
    const branch = req.body.branch
    const semester = req.body.semester
    const curriculum = req.body.curriculum
    try{
        const _id = req.user._id
        const commonFileId = new mongoose.Types.ObjectId();
        const MaterialData = new Material({
        subjectName,
        description,
        degree,
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
        bucketName: "material",
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
        await MaterialData.save();
    }catch(err){
      return res.send({code:500,message:"Error"})
    }
}


async function GetRequiredMaterial(req,res){
  const degree = req.query.degree
  const semester = req.query.semester
  const branch = req.query.branch
  const curriculum = req.query.curriculum
  try{
    const MaterialData = await Material.find({degree,semester,branch,curriculum})
    return res.send({code:200, message:"Success",data:MaterialData})
    
  }catch(err){
    return res.send({code:200,message:"Error"})
  }
}

async function PreviewMaterial(req,res){
  try {
    const { filename } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "material",
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


async function DownloadMaterial(req,res){
  try {
    const { filename } = req.params;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "material",
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


async function GetMyMaterial(req,res){
  try{
    const id = req.user._id
    const MyMaterialData = await Material.find({creatorId:id})
    if(MyMaterialData){
      return res.send({code:200,message:"Success",data:MyMaterialData})
    }else{
      return res.send({code:404,message:"error"})
    }
  }catch(err){
    return res.send({code:500,message:err})
  }
}

async function DeleteMyMaterial(req,res){
  const {id} = req.params
  try{
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db,{
      bucketName:'material'
    })
    const MyMaterial = await Material.findOne({_id:id})
    if(MyMaterial){
      const MaterialFileInfo = await bucket.find({ filename: MyMaterial.file.filename }).toArray();
      for (const i of MaterialFileInfo) {
        await bucket.delete(i._id);
      }
      await Material.deleteOne({ _id: id });
      return res.send({code:200,message:"Deleted succesfully"})
    }else{
      return res.send({code:404,message:"File is not present"})
    }
  }catch(err){
    return res.send({code:500,message:"Error"})
  }
}
    

module.exports = {UploadMaterial,GetRequiredMaterial,PreviewMaterial,DownloadMaterial,GetMyMaterial,DeleteMyMaterial}