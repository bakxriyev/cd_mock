import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
  Body,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger"
import { WritingService } from "./writing.service"
import { CreateWritingDto, UpdateWritingDto } from "./dto"

@ApiTags("Writing")
@Controller("writing")
export class WritingController {
  constructor(private readonly writingService: WritingService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("task_image", {
      storage: diskStorage({
        destination: "./uploads/writing",
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateWritingDto })
  create(@Body() dto: CreateWritingDto, @UploadedFile() file: Express.Multer.File) {
    return this.writingService.create(dto, file)
  }

  @Get()
  findAll() {
    return this.writingService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.writingService.findOne(+id)
  }

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("task_image", {
      storage: diskStorage({
        destination: "./uploads/writing",
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateWritingDto })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateWritingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.writingService.update(+id, dto, file)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.writingService.remove(+id)
  }
}
