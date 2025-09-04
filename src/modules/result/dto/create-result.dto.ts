import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsDateString, IsOptional } from "class-validator"

export class CreateResultDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNumber()
  user_id: number

  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: 40, description: "Reading total questions" })
  @IsNumber()
  reading_total_questions: number

  @ApiProperty({ example: 35, description: "Reading correct answers" })
  @IsNumber()
  reading_correct_answers: number

  @ApiProperty({ example: 40, description: "Listening total questions" })
  @IsNumber()
  listening_total_questions: number

  @ApiProperty({ example: 32, description: "Listening correct answers" })
  @IsNumber()
  listening_correct_answers: number

  @ApiProperty({ example: 7, description: "Writing score (0–9 band)" })
  @IsNumber()
  writing_score: number

  @ApiProperty({ example: 6.5, description: "Speaking score (0–9 band)" })
  @IsOptional()
  speaking_score: string

  @ApiProperty({ example: "2025-08-28T12:00:00Z", description: "Exam taken date" })
  @IsDateString()
  taken_at: Date
}