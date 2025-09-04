import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, Min, Max, IsOptional } from "class-validator"


export class UpdateSpeakingDto {
  @ApiProperty({ example: 8, description: "Updated speaking score", required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9)
  score?: number
}