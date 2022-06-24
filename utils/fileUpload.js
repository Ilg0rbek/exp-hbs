const multer = require('multer')
const path = require('path')


//set Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//initilaize upload
const upload = multer(
    {
        storage,
        limits: { fileSize: 10000000 },
        fileFilter: function (req, file, cb) {
            const filetypes = /jpeg|jpg|png|gif/
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
            const mimetype = filetypes.test(file.mimetype)
        
            if (extname && mimetype) {
                return cb(null, true)
            } else {
                cb("you can not upload file")
            }
        }
    }
)


module.exports = upload