import { PartialType } from '@nestjs/swagger';
import { CreateSpeakingAnswerDto } from './create-speaking_answer.dto';

export class UpdateSpeakingAnswerDto extends PartialType(CreateSpeakingAnswerDto) {}
