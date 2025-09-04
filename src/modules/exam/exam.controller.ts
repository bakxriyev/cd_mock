// exam.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ApiConsumes, ApiBody, ApiTags, ApiResponse } from "@nestjs/swagger";
import { ExamService } from "./exam.service";
import { CreateExamDto, UpdateExamDto } from "./dto";
import { Exam } from "./exam.model";

@ApiTags("Exams")
@Controller("exams")
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: './uploads/mock', // uploads/mock papkaga saqlansin
        filename: (req, file, cb) => {
          const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: CreateExamDto })
  @ApiResponse({ status: 201, description: "Exam created successfully", type: Exam })
  async create(@Body() dto: CreateExamDto, @UploadedFile() file?: Express.Multer.File) {
    return this.examService.create(dto, file?.filename);
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of exams", type: [Exam] })
  async findAll() {
    return this.examService.findAll();
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Exam details", type: Exam })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.examService.findOne(id);
  }

  @Put(":id")
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: './uploads/mock',
        filename: (req, file, cb) => {
          const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: UpdateExamDto })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateExamDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.examService.update(id, dto, file?.filename);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.examService.remove(id);
  }
}
