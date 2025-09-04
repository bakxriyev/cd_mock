import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class UpdateWritingAnswerDto {
  @ApiPropertyOptional({ example: "Updated essay text", description: "Answer text" })
  @IsOptional()
  @IsString()
  answer_text?: string

  @ApiPropertyOptional({ example: 90, description: "Score given for the answer" })
  @IsOptional()
  @IsNumber()
  score?: number
}