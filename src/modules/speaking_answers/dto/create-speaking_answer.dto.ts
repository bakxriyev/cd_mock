import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional } from "class-validator"

export class CreateSpeakingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNumber()
  user_id: number

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: 85, description: "Score (0-100 oralig‘ida)" })
  @IsOptional()
  @IsNumber()
  score?: number
}
