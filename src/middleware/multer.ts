import multer from "multer"
const upload = multer({dest: 'uploads/'})
const storage = multer.diskStorage({
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

export default upload