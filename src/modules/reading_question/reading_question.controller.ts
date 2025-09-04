import { Controller, Post, Get, Param, Body, Put, Delete, UploadedFile, UseInterceptors, ParseIntPipe } from "@nestjs/common";
import { ReadingQuestionService } from "./reading_question.service";
import { CreateReadingQuestionDto, UpdateReadingQuestionDto } from "./dto";
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadFileDto } from "./dto/upload-file.dto";
import { ReadingQuestion } from "./model/reading_question.entity";
import { diskStorage } from "multer";
import { extname } from "path";

@ApiTags("Reading Questions")
@Controller("reading-questions")
export class ReadingQuestionController {
  constructor(private readonly service: ReadingQuestionService) {}

  // Create question
@Post()
  @ApiOperation({ summary: "Create new reading question" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateReadingQuestionDto })
  @UseInterceptors(
      FileInterceptor("photo", {
        storage: diskStorage({
          destination: './uploads/reading_questions', // uploads/mock papkaga saqlansin
          filename: (req, file, cb) => {
            const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
    )
  create(@Body() dto: CreateReadingQuestionDto, @UploadedFile() file?: Express.Multer.File) {
    return this.service.create({ ...dto, photo: file?.filename });
  }

  // Get all questions
  @Get()
  @ApiOperation({ summary: "Get all reading questions" })
  @ApiResponse({ status: 200, description: "List of questions", type: [ReadingQuestion] })
  findAll() {
    return this.service.findAll();
  }

  // Get single question
  @Get(":id")
  @ApiOperation({ summary: "Get reading question by ID" })
  @ApiResponse({ status: 200, description: "Question details", type: ReadingQuestion })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Update question
  @Put(":id")
  @ApiOperation({ summary: "Update reading question by ID" })
  @ApiConsumes("application/json")
  @ApiBody({ type: UpdateReadingQuestionDto })
  @ApiResponse({ status: 200, description: "Question updated", type: ReadingQuestion })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateReadingQuestionDto) {
    return this.service.update(id, dto);
  }

  // Delete question
  @Delete(":id")
  @ApiOperation({ summary: "Delete reading question by ID" })
  @ApiResponse({ status: 200, description: "Question deleted" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // Upload file (photo/audio)
  @Post("upload")
  @ApiOperation({ summary: "Upload file for reading question (photo/audio)" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UploadFileDto })
  @UseInterceptors(FileInterceptor("file"))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
