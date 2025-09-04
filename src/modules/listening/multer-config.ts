import { diskStorage } from "multer"
import { extname } from "path"
import { BadRequestException } from "@nestjs/common"

const audioFileFilter = (req: any, file: Express.Multer.File, callback: Function) => {
  const allowedMimeTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-m4a"]
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return callback(new BadRequestException("Faqat audio fayllarni yuklash mumkin (mp3, m4a, wav)"), false)
  }
  callback(null, true)
}

export const listeningStorage = {
  storage: diskStorage({
    destination: "./uploads/listening",
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
      callback(null, uniqueSuffix + extname(file.originalname))
    },
  }),
  fileFilter: audioFileFilter,
}
