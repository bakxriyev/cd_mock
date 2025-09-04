import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { SpeakingAnswer } from "./entities/speaking_answer.entity"
import { SpeakingAnswerService } from "./speaking_answers.service"
import { SpeakingAnswerController } from "./speaking_answers.controller"

@Module({
  imports: [SequelizeModule.forFeature([SpeakingAnswer])],
  providers: [SpeakingAnswerService],
  controllers: [SpeakingAnswerController],
})
export class SpeakingAnswerModule {}
