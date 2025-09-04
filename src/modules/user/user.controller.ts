import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger"
import { FileInterceptor } from "@nestjs/platform-express"

@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Create User (photo bilan)" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("photo"))
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Ali Valiyev" },
        email: { type: "string", example: "ali@gmail.com" },
        username: { type: "string", example: "ali123" },
        password: { type: "string", example: "12345" },
      },
    },
  })
  create(
    @Body() dto: CreateUserDto,
  ) {
    return this.userService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: "Barcha userlarni olish" })
  @ApiResponse({ status: 200, description: "List of users" })
  findAll() {
    return this.userService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha userni olish" })
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Userni yangilash (photo bilan)" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("photo"))
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string", example: "Ali Updated" },
        email: { type: "string", example: "ali_new@gmail.com" },
        username: { type: "string", example: "ali_updated" },
        password: { type: "string", example: "54321" }
      },
    },
  })
  update(
    @Param("id") id: number,
    @Body() dto: UpdateUserDto,
   
  ) {
    return this.userService.update(id, dto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Userni o‘chirish" })
  remove(@Param("id") id: number) {
    return this.userService.remove(id)
  }
}
