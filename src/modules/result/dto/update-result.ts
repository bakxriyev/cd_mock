import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsDateString } from "class-validator"

export class UpdateResultDto {
  @ApiProperty({ example: 36, description: "Reading correct answers", required: false })
  @IsOptional()
  @IsNumber()
  reading_correct_answers?: number

  @ApiProperty({ example: 34, description: "Listening correct answers", required: false })
  @IsOptional()
  @IsNumber()
  listening_correct_answers?: number

  @ApiProperty({ example: 8, description: "Writing score", required: false })
  @IsOptional()
  @IsNumber()
  writing_score?: number

  @ApiProperty({ example: 7.5, description: "Speaking score", required: false })
  @IsOptional()
  speaking_score?: string
}