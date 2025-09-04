import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateWritingAnswerDto {
  @ApiProperty({ example: 1, description: "User ID" })
  @IsNotEmpty()
   @Transform(({ value }) => Number(value))
  user_id: number

  @ApiProperty({ example: 2, description: "Exam ID" })
  @IsNotEmpty()
@Transform(({ value }) => Number(value))
  exam_id: number

  @ApiProperty({ example: 3, description: "Writing Task ID" })
  @IsNotEmpty()
   @Transform(({ value }) => Number(value))
  writing_id: number

  @ApiProperty({ example: "This is my essay answer text...", description: "Answer text" })
  @IsString()
  @IsNotEmpty()
  answer_text: string

  @ApiProperty({ example: "Users wiritng score", description: "Score" })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  score: number

}
