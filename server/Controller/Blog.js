const Blog = require('../Model/Blogs')
const multer = require('multer');
const { Readable } = require('stream');
const mongoose = require('mongoose')



const generateUniqueFilename = (commonFileId, originalFilename) => {
    return `${commonFileId}_${originalFilename}`;
  };


async function CreateNewBlog(req,res){
    const title = req.body.title
    const description = req.body.description
    const commonFileId = new mongoose.Types.ObjectId();
        const BlogData = new Blog({
        title,
        description,
        rollNumber:req.user.rollNumber,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        branch:req.user.branch,
        email:req.user.email,
        images: req.files.map((file) => ({
          imagename: generateUniqueFilename(commonFileId, file.originalname),
          imageId: commonFileId, 
        })),
      });
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "blogs",
      });

      for (const file of req.files) {
        const uniqueFilename = generateUniqueFilename(
          commonFileId,
          file.originalname
        );
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);
        const uploadStream = bucket.openUploadStream(uniqueFilename, {
          _id: commonFileId,
        });

        readableStream.pipe(uploadStream);
      }

      await BlogData.save();
}

async function GetAllBlogs(req, res){
    try {
        const BlogData = await Blog.find({})
            .sort({ _id: -1 });


        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "blogs",
        });

        // Function to fetch image data
        const fetchImageData = async (imagename) => {
            return new Promise((resolve, reject) => {
                const downloadStream = bucket.openDownloadStreamByName(imagename);

                let data = [];
                downloadStream.on('data', chunk => data.push(chunk));
                downloadStream.on('end', () => resolve(Buffer.concat(data).toString('base64')));
                downloadStream.on('error', reject);
            });
        };

        // Process all blogs and fetch images
        const BlogArray = await Promise.all(BlogData.map(async (blog) => {
            const imagesWithData = await Promise.all(blog.images.map(async (img) => {
                const imageData = await fetchImageData(img.imagename);
                return {
                    imagename: img.imagename,
                    imageId: img.imageId,
                    data: imageData // Base64 string of the image
                };
            }));

            return {
                _id:blog._id,
                title: blog.title,
                description: blog.description,
                firstName: blog.firstName,
                lastName: blog.lastName,
                images: imagesWithData,
                rollNumber: blog.rollNumber,
                email: blog.email,
                createdAt: blog.createdAt
            };
        }));

        
        return res.send({ code: 200, message: 'Success', data: BlogArray });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        return res.send({ code: 500, message: 'Error occurred' });
    }
};

async function GetMyBlogs(req,res){
  try{
    const rollNumber = req.user.rollNumber
    const BlogData = await Blog.find({rollNumber}).sort({_id:-1})
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "blogs",
  });

  // Function to fetch image data
  const fetchImageData = async (imagename) => {
      return new Promise((resolve, reject) => {
          const downloadStream = bucket.openDownloadStreamByName(imagename);

          let data = [];
          downloadStream.on('data', chunk => data.push(chunk));
          downloadStream.on('end', () => resolve(Buffer.concat(data).toString('base64')));
          downloadStream.on('error', reject);
      });
  };

  // Process all blogs and fetch images
  const BlogArray = await Promise.all(BlogData.map(async (blog) => {
      const imagesWithData = await Promise.all(blog.images.map(async (img) => {
          const imageData = await fetchImageData(img.imagename);
          return {
              imagename: img.imagename,
              imageId: img.imageId,
              data: imageData // Base64 string of the image
          };
      }));

      return {
          _id:blog._id,
          title: blog.title,
          description: blog.description,
          firstName: blog.firstName,
          lastName: blog.lastName,
          images: imagesWithData,
          rollNumber: blog.rollNumber,
          email: blog.email,
          createdAt: blog.createdAt
      };
  }));

  
  return res.send({ code: 200, message: 'Success', data: BlogArray });
  }catch(err){
    console.log(err)
  }
}


async function DeleteBlog(req,res){
  const id = req.params.id
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "blogs", 
    });
    const BlogDetails = await Blog.findOne({ _id: id })
    if (!BlogDetails) {
      return res.status(404).json({ error: "Blog not found" });
    }
    for (const image of BlogDetails.images) {
      const imageInfo = await bucket.find({ imagename: image.imageName }).toArray();
      for (const i of imageInfo) {
        await bucket.delete(i._id);
      }
    }
    BlogDetails.images = [];
    await Blog.deleteOne({ _id: id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
    
async function UpdateBlog(req, res) {
  const {id} = req.params
  const  title = req.body.title 
  const description = req.body.description
  try {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'blogs',
    });
    const blogDetails = await Blog.findOne({ _id: id });
    if (!blogDetails) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    for (const image of blogDetails.images) {
      const imageInfo = await bucket.find({ filename: image.imagename }).toArray();
      for (const i of imageInfo) {
        await bucket.delete(i._id);
      }
    }
    blogDetails.images = [];
    blogDetails.title = title;
    blogDetails.description = description;
    const newImages = req.files.map((file) => {
      const uniqueFilename = generateUniqueFilename(new mongoose.Types.ObjectId(), file.originalname);
      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);
      
      const uploadStream = bucket.openUploadStream(uniqueFilename);
      readableStream.pipe(uploadStream);
      
      return {
        imagename: uniqueFilename,
        imageId: uploadStream.id,
      };
    });
    blogDetails.images = newImages;
    await blogDetails.save();
    
    res.status(200).json({ message: 'Blog updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the blog.' });
  }
}


module.exports = {CreateNewBlog,GetAllBlogs,GetMyBlogs,DeleteBlog,UpdateBlog}