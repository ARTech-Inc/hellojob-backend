const multer = require('multer')
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'public/uploads/images/')
  },
  filename:(req, file, cb)=>{
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  } 
})

const formUpload= multer({ storage: storage })

module.exports = formUpload