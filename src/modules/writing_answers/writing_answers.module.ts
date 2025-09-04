import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { WritingAnswer } from "./entities/writing_answer.entity"
import { WritingAnswersService } from "./writing_answers.service"
import { WritingAnswersController } from "./writing_answers.controller"

@Module({
  imports: [SequelizeModule.forFeature([WritingAnswer])],
  controllers: [WritingAnswersController],
  providers: [WritingAnswersService],
})
export class WritingAnswersModule {}
