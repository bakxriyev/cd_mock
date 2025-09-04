import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Min, Max } from "class-validator"

export class CreateSpeakingDto {
  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: 7.5, description: "Speaking score (IELTS band 0–9)" })
  @IsNumber()
  @Min(0)
  @Max(9)
  score: number
}