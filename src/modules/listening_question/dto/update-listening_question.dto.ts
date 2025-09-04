import { PartialType } from "@nestjs/swagger"
import { CreateListeningQuestionDto } from "./create-listening_question.dto"

export class UpdateListeningQuestionDto extends PartialType(CreateListeningQuestionDto) {}
