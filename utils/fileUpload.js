const multer = require('multer')
const path = require('path')

//set Storage
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//initilaize upload
const upload = multer(
    {
        storage,
        limits: { fileSize: 1000000 },
        fileFilter: function (req, file, cb) {
            CheckFileType(file, cb)
        }
    }
)


//Check file for image
const CheckFileType = (file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(path.extname(file.orginalname).toLowerCase())
    const mimetype = fileTypes.test(mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        return cb("you can not upload file")
    }

}

module.exports = upload