// create-reading-question.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsEnum, IsArray } from "class-validator";
import { Type, Transform } from "class-transformer";
import { ReadingPart } from "../model/reading-parts.enum";

export enum QuestionType {
  MCQ = "mcq",
  TRUE_FALSE_NOT_GIVEN = "true_false_not_given",
  YES_NO_NOT_GIVEN = "yes_no_not_given",
  MATCHING_INFORMATION = "matching_information",
  MATCHING_HEADINGS = "matching_headings",
  MATCHING_FEATURES = "matching_features",
  MATCHING_SENTENCE_ENDINGS = "matching_sentence_endings",
  SENTENCE_COMPLETION = "sentence_completion",
  SUMMARY_COMPLETION = "summary_completion",
  DIAGRAM_LABEL_COMPLETION = "diagram_label_completion",
  SHORT_ANSWER = "short_answer",
}

export class CreateReadingQuestionDto {
  @ApiProperty({ example: 1, description: "Reading ID" })
  @IsNumber()
  @Type(() => Number)
  reading_id: number;

  @ApiProperty({ example: "What is the main idea of the passage?", description: "Question text" })
  @IsString()
  @IsNotEmpty()
  question_text: string;

  @ApiProperty({
    description: "Type of question",
    enum: QuestionType,
    type: "string",
    example: QuestionType.MCQ,
  })
  @IsEnum(QuestionType)
  question_type: QuestionType;

  @ApiProperty({
    example: ["Option A", "Option B", "Option C"],
    description: "Answer options (if multiple choice)",
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    // Agar JSON string sifatida kelgan bo‘lsa arrayga aylantirish
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(","); // agar vergul bilan kelsa
      }
    }
    return value;
  })
  options?: string[];

  @ApiProperty({
    example: ["A"],
    description: "Correct answers",
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(",");
      }
    }
    return value;
  })
  correct_answers: string[];

  @ApiProperty({ example: 1, description: "Order number" })
  @IsNumber()
  @Type(() => Number)
  order_no: number;

 @ApiProperty({
  type: "string",
  description: "Optional photo filename",
  required: false,
})
@IsOptional()
@IsString()
photo?: string;

 @ApiProperty({
    description: "Listening part",
    enum: ReadingPart,
    example: ReadingPart.PART1,
  })
  @IsEnum(ReadingPart)
  part: ReadingPart;
}
