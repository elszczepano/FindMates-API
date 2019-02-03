import multer from 'multer';
import fs from 'fs';
import mkdirp from 'mkdirp';

const currentDate = new Date();
const dirName = `./uploads/${currentDate.getFullYear()}/${currentDate.getMonth()+1}`;

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only JPEG and PNG allowed.'));
    }
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.exists(dirName)){
            mkdirp(dirName, function() {
                callback(null, dirName);
            });
        } else {
            callback(new Error('Invalid directory.'));
        }
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});

export default upload;