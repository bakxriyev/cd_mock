import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { SpeakingService } from "./speaking.service"
import { CreateSpeakingDto, UpdateSpeakingDto } from "./dto"
import { Speaking } from "./model/speaking.model"

@ApiTags("Speaking")
@Controller("speaking")
export class SpeakingController {
  constructor(private readonly speakingService: SpeakingService) {}

  @Post()
  @ApiOperation({ summary: "Create speaking score" })
  @ApiResponse({ status: 201, type: Speaking })
  create(@Body() dto: CreateSpeakingDto) {
    return this.speakingService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Get all speaking scores" })
  @ApiResponse({ status: 200, type: [Speaking] })
  findAll() {
    return this.speakingService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "Get speaking score by ID" })
  @ApiResponse({ status: 200, type: Speaking })
  findOne(@Param("id") id: string) {
    return this.speakingService.findOne(+id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update speaking score" })
  @ApiResponse({ status: 200, type: Speaking })
  update(@Param("id") id: string, @Body() dto: UpdateSpeakingDto) {
    return this.speakingService.update(+id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete speaking score" })
  remove(@Param("id") id: string) {
    return this.speakingService.remove(+id)
  }
}
