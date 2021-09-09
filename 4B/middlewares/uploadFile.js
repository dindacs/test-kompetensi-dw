const multer = require('multer');

module.exports = (imageFile) => {

  // destinasi file
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },

    // atur nama file agar tidak ada spasi
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
    }
  });

  //proses filter extensi gambar
  const fileFilter = (req, file, cb) => {
    if (file.filename === imageFile) {
      if (file.originalname.match(/\.(jpg|JPG|JPEG|jpeg|png|PNG|svg|SVG)$/)) {
        // tampilkan pesan error extensi gambar
        req.fileValidationError = {
          message: 'Image extensions are not allowed!'
        }
        return cb(new Error('Image extensions are not allowed!'), false);
      }
    }
    cb(null, true);
  };

  // max size gambar 
  const sizeInMb = 5;
  const maxSize = sizeInMb * 1000 * 50;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(imageFile);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        req.session.message = {
          type: 'danger',
          message: 'Please select file',
        }
      }

      if (err) {
        if (err.code == 'LIMIT_FILE_SIZE') {
          if (req.fileValidationError) {
            req.session.message = {
              type: 'danger',
              message: 'Max image size 5 mb',
            };
            return res.redirect(req.originalUrl);
          }

          req.session.message = {
            type: 'danger',
            message: err,
          };

          return res.redirect(req.originalUrl);

        }
      }

      return next();

    });
  };
}