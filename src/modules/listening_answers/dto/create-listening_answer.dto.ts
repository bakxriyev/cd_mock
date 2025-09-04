import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateListeningAnswerDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number

  @ApiProperty({ example: 1 })
  @IsNumber()
  examId: number

  @ApiProperty({ example: 10 })
  @IsNumber()
  listening_question_id: number

  @ApiProperty({ example: "B", description: "User javobi" })
  @IsString()
  @IsNotEmpty()
  user_answer: string
}
