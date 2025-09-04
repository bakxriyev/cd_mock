import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ReadingAnswer } from "./entities/reading_answer.entity"
import { ReadingAnswersService } from "./reading_answers.service"
import { ReadingAnswersController } from "./reading_answers.controller"
import { ReadingQuestion } from "../reading_question/model/reading_question.entity"

@Module({
  imports: [SequelizeModule.forFeature([ReadingAnswer,ReadingQuestion])],
  providers: [ReadingAnswersService],
  controllers: [ReadingAnswersController],
  exports: [ReadingAnswersService],
})
export class ReadingAnswersModule {}
