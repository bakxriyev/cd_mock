import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ListeningQuestionService } from "./listening_question.service";
import { CreateListeningQuestionDto, UpdateListeningQuestionDto } from "./dto";
import { ListeningQuestion } from "./entities/listening_question.entity";

const audioFileOptions = {
  storage: diskStorage({
    destination: './uploads/listening_questions',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};

@ApiTags("Listening Questions")
@Controller("listening-questions")
export class ListeningQuestionController {
  constructor(private readonly service: ListeningQuestionService) {}

  @Post()
  @UseInterceptors(FileInterceptor("audio", audioFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateListeningQuestionDto })
  async create(@Body() body: CreateListeningQuestionDto, @UploadedFile() audio?: Express.Multer.File) {
    const listeningId = Number(body.listening_id);
    if (isNaN(listeningId)) {
      throw new BadRequestException("listening_id must be a number");
    }

    const optionsArray: string[] = body.options
      ? Array.isArray(body.options)
        ? body.options
        : body.options.split(",").map(o => o.trim())
      : [];

    const correctAnswersArray: string[] = body.correct_answers
      ? Array.isArray(body.correct_answers)
        ? body.correct_answers
        : body.correct_answers.split(",").map(a => a.trim())
      : [];

    return this.service.create(
      {
        ...body,
        listening_id: listeningId,
        options: optionsArray,
        correct_answers: correctAnswersArray,
      },
      audio?.filename, // audio fayl nomi DBga saqlanadi
    );
  }

  @Get()
  findAll(): Promise<ListeningQuestion[]> {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<ListeningQuestion> {
    return this.service.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("audio", audioFileOptions))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateListeningQuestionDto })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateListeningQuestionDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<ListeningQuestion> {
    const optionsArray: string[] = dto.options
      ? Array.isArray(dto.options)
        ? dto.options
        : dto.options.split(",").map(o => o.trim())
      : undefined;

    const correctAnswersArray: string[] = dto.correct_answers
      ? Array.isArray(dto.correct_answers)
        ? dto.correct_answers
        : dto.correct_answers.split(",").map(a => a.trim())
      : undefined;

    return this.service.update(
      id,
      {
        ...dto,
        options: optionsArray,
        correct_answers: correctAnswersArray,
      },
      file?.filename,
    );
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
