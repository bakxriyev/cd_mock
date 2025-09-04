import { diskStorage } from 'multer';
import { extname } from 'path';

export const audioFileOptions = {
  storage: diskStorage({
    destination: './uploads/listening_questions', // saqlanadigan papka
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`); // original ext name saqlanadi
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(mp3)$/)) {
      return cb(new Error('Only mp3 files are allowed!'), false);
    }
    cb(null, true);
  },
};