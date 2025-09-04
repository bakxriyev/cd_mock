import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { CreateUserDto } from "../user/dto/create-user.dto"
import { LoginDto } from "./dto/login.dto"

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({ status: 201, description: "User successfully registered" })
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto)
  }

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Tokens returned" })
  async login(
    @Body() logindto:LoginDto) {
    return this.authService.login(logindto)
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh tokens" })
  @ApiResponse({ status: 200, description: "New tokens returned" })
  async refresh(
    @Body() body: { userId: number; refreshToken: string },
  ) {
    return this.authService.refreshToken(body.refreshToken, body.userId)
  }
}
