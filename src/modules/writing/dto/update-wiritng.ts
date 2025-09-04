import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { WritingPart } from "../model/writing-parts"


export class UpdateWritingDto {
  @ApiPropertyOptional({ enum: ["1", "2"], description: "Writing part" })
  @IsEnum(WritingPart)
  @IsOptional()
  part?: WritingPart

  @ApiPropertyOptional({ example: "Updated essay task text.", description: "Task text" })
  @IsOptional()
  @IsString()
  task_text?: string

  @ApiPropertyOptional({ type: "string", format: "binary", description: "Task image (optional)" })
  @IsOptional()
  task_image?: Express.Multer.File

}