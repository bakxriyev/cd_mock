import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: "Ali Valiyev", description: "User full name" })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({ example: "ali@gmail.com", description: "User email" })
  @IsEmail()
  email: string

  @ApiProperty({ example: "ali123", description: "Unique username" })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ example: "12345", description: "User password" })
  @IsNotEmpty()
  @IsString()
  password: string
}
