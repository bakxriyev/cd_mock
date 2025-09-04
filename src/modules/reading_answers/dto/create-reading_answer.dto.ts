// dto/create-reading-answer.dto.ts
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateReadingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
 @IsNumber()
  userId: number

  @ApiProperty({ example: 5, description: "Question ID" })
  @IsNumber()
  questionId: number

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNumber()
  examId: number

  @ApiProperty({ example: "B", description: "User javobi" })
  @IsString()
  @IsNotEmpty()
  answer: string
}
