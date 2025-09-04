import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"

export enum ExamType {
  READING = "READING",
  LISTENING = "LISTENING",
  WRITING = "WRITING"
}

export class CreateExamDto {
  @ApiProperty({ enum: ExamType, example: ExamType.READING, description: "Exam turini tanlang" })
  @IsEnum(ExamType)
  exam_type: ExamType

  @ApiProperty({ example: "IELTS Reading Test", description: "Imtihon sarlavhasi" })
  @IsString()
  title: string

  @ApiProperty({ example: "IELTS Reading Part 1 uchun test", description: "Imtihon tavsifi" })
  @IsString()
  description: string

  @ApiProperty({ example: 60, description: "Imtihon davomiyligi (daqiqalarda)" })
  @IsString()
  duration: string

  @ApiProperty({example:"mock123", description:"Exam password"})
  @IsOptional()
  password: string

  @ApiProperty({
    type: "string",
    format: "binary",
    required: false,
    description: "Imtihon rasmi (upload qilinadigan fayl)",
  })
  @IsOptional()
  photo?: string
}