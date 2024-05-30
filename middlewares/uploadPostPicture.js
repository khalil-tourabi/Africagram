import multer from 'multer';

 let storagepost= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/posts')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })

  export const uploadpost = multer({ storage: storagepost})

