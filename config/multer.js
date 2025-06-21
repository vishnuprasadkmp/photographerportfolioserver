const multer = require('multer');

// Use memory storage to hold file buffer in memory
const storage = multer.memoryStorage();

// Multer configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, .png files are allowed'), false);
    }
  }
});

module.exports = upload;
