import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateListeningDto {
  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNotEmpty()
  exam_id: number

  @ApiProperty({example: "Listening title", description: "Test nomi"})
  @IsOptional()
  title: string

  @ApiProperty({example: "Listening desctiption", description: "Test nomi"})
  @IsOptional()
  description: string

}