import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { ResultService } from "./result.service";
import { CreateResultDto, UpdateResultDto } from "./dto";

@ApiTags("Results")
@Controller("results")
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @ApiBody({ type: CreateResultDto })
  async create(@Body() dto: CreateResultDto) {
    return this.resultService.create(dto);
  }

  @Get()
  async findAll() {
    return this.resultService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const result = await this.resultService.findOne(id);
    if (!result) throw new NotFoundException("Result not found");
    return result;
  }


  // @Get("user/:id")
  // async getUserResults(@Param("id", ParseIntPipe) userId: number) {
  //   const results = await this.resultService.getUserResults(userId);
  //   if (!results) throw new NotFoundException("User results not found");
  //   return results;
  // }

  @Put(":id")
  @ApiBody({ type: UpdateResultDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateResultDto) {
    return this.resultService.update(id, dto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.resultService.remove(id);
    return { message: "Result deleted successfully" };
  }
}
