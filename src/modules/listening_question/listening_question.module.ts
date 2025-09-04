import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { ListeningQuestion } from "./entities/listening_question.entity"
import { ListeningQuestionService } from "./listening_question.service"
import { ListeningQuestionController } from "./listening_question.controller"

@Module({
  imports: [SequelizeModule.forFeature([ListeningQuestion])],
  controllers: [ListeningQuestionController],
  providers: [ListeningQuestionService],
  exports: [ListeningQuestionService],
})
export class ListeningQuestionModule {}
