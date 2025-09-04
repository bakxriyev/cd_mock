import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, isString, IsString } from "class-validator"

export class CreateReadingDto {
  @ApiProperty({ example: 1, description: "Exam ID" })
  @IsNumber()
  exam_id: number

  @ApiProperty({ example: "The History of AI", description: "Passage title" })
  @IsString()
  @IsNotEmpty()
  passage_title: string

  @ApiProperty({ example: "Artificial Intelligence has a long history...", description: "Passage text" })
  @IsString()
  passage_text: string

  @ApiProperty({ example: "Reading passage", description: "Reading date" }) 
  @IsString()
  title: string

}
