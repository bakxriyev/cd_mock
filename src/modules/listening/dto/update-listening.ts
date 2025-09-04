import { ApiProperty } from "@nestjs/swagger"
import {IsNumber, IsOptional } from "class-validator"


export class UpdateListeningDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  exam_id?: number

 @ApiProperty({example: "Listening title", description: "Test nomi"})
  title?: string

  @ApiProperty({example: "Listening desctiption", description: "Test nomi"})
  description?: string


}