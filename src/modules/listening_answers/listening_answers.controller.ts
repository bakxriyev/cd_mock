import { Controller, Post, Get, Param, Body, Put, Delete, ParseIntPipe } from "@nestjs/common"
import { ApiTags, ApiResponse, ApiBody } from "@nestjs/swagger"
import { ListeningAnswerService } from "./listening_answers.service"
import { CreateListeningAnswerDto, UpdateListeningAnswerDto } from "./dto"
import { ListeningAnswer } from "./entities/listening_answer.entity"

@ApiTags("Listening Answers")
@Controller("listening-answers")
export class ListeningAnswerController {
  constructor(private readonly service: ListeningAnswerService) {}

  @Post()
  @ApiBody({ type: CreateListeningAnswerDto })
  @ApiResponse({ status: 201, description: "Create listening answer", type: ListeningAnswer })
  async create(@Body() dto: CreateListeningAnswerDto) {
    return this.service.create(dto)
  }

  @Get()
  @ApiResponse({ status: 200, description: "List of listening answers", type: [ListeningAnswer] })
  async findAll() {
    return this.service.findAll()
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Listening answer detail", type: ListeningAnswer })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id)
  }

  @Put(":id")
  @ApiBody({ type: UpdateListeningAnswerDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateListeningAnswerDto) {
    return this.service.update(id, dto)
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id)
  }
}
