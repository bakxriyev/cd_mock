import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class RegisterDto {

  @ApiProperty({ example: "John Doe", description: "Foydalanuvchining to‘liq ismi" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: "john_doe",
    description: "Foydalanuvchining username (unikal bo‘lishi mumkin)"
  })

  username: string

  @ApiProperty({
    example: "john@example.com",
    description: "Foydalanuvchining email manzili",
    format: "email"
  })
  email: string

  @ApiProperty({
    example: "12345678",
    description: "Foydalanuvchi paroli (kamida 4 belgidan iborat)",
    minLength: 4
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string

}
