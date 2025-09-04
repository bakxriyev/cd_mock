import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ReadingQuestion } from "./model/reading_question.entity"
import { ReadingQuestionService } from "./reading_question.service"
import { ReadingQuestionController } from "./reading_question.controller"

@Module({
  imports: [SequelizeModule.forFeature([ReadingQuestion])],
  controllers: [ReadingQuestionController],
  providers: [ReadingQuestionService],
})
export class ReadingQuestionModule {}
