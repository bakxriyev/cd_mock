import { PartialType } from '@nestjs/swagger';
import { CreateReadingQuestionDto } from './create-reading_question.dto';

export class UpdateReadingQuestionDto extends PartialType(CreateReadingQuestionDto) {}
