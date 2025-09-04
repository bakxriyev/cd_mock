import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";
import { ListeningPart } from "../entities/listening-parts";
import { ListeningQuestionType } from "../entities/listening_question.entity";
import { Transform } from "class-transformer";

export class CreateListeningQuestionDto {
  @ApiProperty({ example: 1, description: "Listening ID" })
  @IsNotEmpty()
 @Transform(({ value }) => Number(value))
  listening_id: number;

  @ApiProperty({ example: "Part 1 Question", description: "Title of the question" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: "What did the speaker say?", description: "Question text" })
  @IsNotEmpty()
  @IsString()
  question_text: string;

  @ApiProperty({
    description: "Question type",
    enum: ListeningQuestionType,
    example: ListeningQuestionType.MATCHING,
  })
  @IsEnum(ListeningQuestionType, { message: "question_type noto‘g‘ri qiymat" })
  question_type: ListeningQuestionType;

  @ApiProperty({
    example: "Yes,No",
    description: "Options for the question (comma separated for multipart/form-data)",
    required: false,
  })
  @IsOptional()
  @IsString()
  options?: string | string[];;

  @ApiProperty({
    example: "Yes",
    description: "Correct answers (comma separated for multipart/form-data)",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  correct_answers: string | string[];;

  @ApiProperty({
    type: "string",
    format: "binary",
    required: false,
    description: "Optional photo for the question",
  })
  @IsOptional()
  audio?: string;


  @ApiProperty({
    description: "Listening part",
    enum: ListeningPart,
    example: ListeningPart.PART1,
  })
  @IsEnum(ListeningPart)
  part: ListeningPart;
}
