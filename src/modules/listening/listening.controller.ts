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
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ApiConsumes, ApiBody, ApiTags, ApiResponse } from "@nestjs/swagger"
import { ListeningService } from "./listening.service"
import { CreateListeningDto, UpdateListeningDto } from "./dto"
import { Listening } from "./listening.model"
import { listeningStorage } from "./multer-config"

@ApiTags("Listening")
@Controller("listening")
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post()
  @UseInterceptors(FileInterceptor("audio_file", listeningStorage))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        exam_id: { type: "number", example: 1 },
        title: { type: "string", example: "Listening title" },
        description: { type: "string", example: "Listening description" },
        audio_file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: "Listening created", type: Listening })
  async create(@Body() dto: CreateListeningDto, @UploadedFile() file: Express.Multer.File) {
    return this.listeningService.create(dto, file.filename)
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of listenings", type: [Listening] })
  async findAll() {
    return this.listeningService.findAll()
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Listening detail", type: Listening })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.listeningService.findOne(id)
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor("audio_file", listeningStorage))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        title: { type: "string", example: "Updated title" },
        description: { type: "string", example: "Updated description" },
        audio_file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateListeningDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.listeningService.update(id, dto, file?.filename)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.listeningService.remove(id)
  }
}
