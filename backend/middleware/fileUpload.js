const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileDestination = 'public/uploads/';
        if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination, { recursive: true });
        }
        cb(null, fileDestination);
    },
    filename: (req, file, cb) => {
        const filename = path.basename(file.originalname, path.extname(file.originalname));
        const ext = path.extname(file.originalname);
        cb(null, `${filename}_${Date.now()}${ext}`);
    }
});

// Image file filter
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|jfif)$/i)) {
        return cb(new Error('You can upload image files only'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter: imageFilter,
    limits: { fileSize: 3000000 } // 3MB limit
});

module.exports = upload;
