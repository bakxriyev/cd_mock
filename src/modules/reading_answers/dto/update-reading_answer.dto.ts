// dto/update-reading-answer.dto.ts
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateReadingAnswerDto {
  @ApiPropertyOptional({ example: "C", description: "Yangilangan javob" })
  @IsOptional()
  @IsString()
  answer?: string
}
