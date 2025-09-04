import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
  @ApiProperty({ example: "bakxriyevvv", description: "Foydalanuvchining username" })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ example: "12345678", description: "Foydalanuvchi paroli", minLength: 4 })
  @IsNotEmpty()
  @IsString()
  password: string
}
