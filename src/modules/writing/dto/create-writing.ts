import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { WritingPart } from "../model/writing-parts"

export class CreateWritingDto {
  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNotEmpty()
  exam_id: number

  @ApiProperty({ enum: WritingPart , description: "Writing part" })
  @IsEnum(WritingPart)
  part: WritingPart

  @ApiProperty({ example: "Write an essay about technology.", description: "Task text" })
  @IsString()
  @IsNotEmpty()
  task_text: string

  @ApiPropertyOptional({ type: "string", format: "binary", description: "Task image (optional)" })
  @IsOptional()
  task_image?: Express.Multer.File

}