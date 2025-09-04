import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { ExamType } from "./create-exam.dto"

export class UpdateExamDto {
  @ApiProperty({ enum: ExamType, required: false })
  @IsOptional()
  @IsEnum(ExamType)
  exam_type?: ExamType

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  duration?: string

  @ApiProperty({example:"mock123", description:"Exam password"})
  @IsOptional()
  password?: string

  @ApiProperty({ type: "string", format: "binary", required: false })
  @IsOptional()
  photo?: string
}
