import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"


export class UpdateListeningAnswerDto {
  @ApiProperty({ example: "C", required: false })
  @IsOptional()
  @IsString()
  user_answer?: string

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_correct?: boolean

  @ApiProperty({ example: "2025-08-28T12:30:00Z", required: false })
  @IsOptional()
  @IsDateString()
  submitted_at?: Date
}