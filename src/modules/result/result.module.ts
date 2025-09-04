import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ResultService } from "./result.service";
import { ResultController } from "./result.controller";

import { Result } from "./model/result.model";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";
import { User } from "../user/user.model";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";
import { ListeningQuestion } from "../listening_question/entities/listening_question.entity";
import { Exam } from "../exam";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Result,
      ReadingAnswer,
      ListeningAnswer,
      WritingAnswer,
      SpeakingAnswer,
      User,
      ReadingQuestion,
      ListeningQuestion,
      Exam
    ]),
  ],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
