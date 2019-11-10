const multer  = require("multer");

const MIME_TYPES = [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/webp'
]

function fileFilter(req, file, cb) {
    if (MIME_TYPES.includes(file.mimetype))
        cb(null, true)
    else
        cb(null, false)
}

const storage = multer.memoryStorage();

module.exports =  multer({
    storage,
    limits: {
        fields: 3,
        fileSize: 2000000,
        files: 1,
    },
    fileFilter,
})
    .single("image");