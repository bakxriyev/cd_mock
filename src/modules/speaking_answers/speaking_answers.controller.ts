import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common"
import { SpeakingAnswerService } from "./speaking_answers.service"
import { CreateSpeakingAnswerDto } from "./dto"
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

@ApiTags("Speaking Answers")
@Controller("speaking-answers")
export class SpeakingAnswerController {
  constructor(private readonly speakingAnswerService: SpeakingAnswerService) {}

  @Post()
  @ApiOperation({ summary: "Speaking Answer yaratish" })
 
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        user_id: { type: "integer", example: 1 },
        exam_id: { type: "integer", example: 2 },
        score: { type: "integer", example: 90 },
      },
    },
  })
  async create(
    @Body() dto: CreateSpeakingAnswerDto,
  ) {
    return this.speakingAnswerService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Barcha Speaking Answerlarni olish" })
  @ApiResponse({ status: 200, description: "List of answers" })
  async findAll() {
    return this.speakingAnswerService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha Speaking Answer olish" })
  async findOne(@Param("id") id: number) {
    return this.speakingAnswerService.findOne(id)
  }
}
