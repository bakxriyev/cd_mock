// upload-file.dto.ts
import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    description: "Upload file (photo/audio) for reading question",
  })
  file: Express.Multer.File;
}
