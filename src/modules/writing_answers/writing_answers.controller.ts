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
import { WritingAnswersService } from "./writing_answers.service"
import { CreateWritingAnswerDto, UpdateWritingAnswerDto } from "./dto"

@ApiTags("Writing Answers")
@Controller("writing-answers")
export class WritingAnswersController {
  constructor(private readonly writingAnswersService: WritingAnswersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("answer_file", {
      storage: diskStorage({
        destination: "./uploads/writing-answers",
        filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateWritingAnswerDto })
  create(@Body() dto: CreateWritingAnswerDto, @UploadedFile() file: Express.Multer.File) {
    return this.writingAnswersService.create(dto)
  }

  @Get()
  findAll() {
    return this.writingAnswersService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.writingAnswersService.findOne(+id)
  }

  @Put(":id")
  @ApiBody({ type: UpdateWritingAnswerDto })
  update(
    @Param("id") id: string,
    @Body() dto: UpdateWritingAnswerDto,
  ) {
    return this.writingAnswersService.update(+id, dto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.writingAnswersService.remove(+id)
  }
}
