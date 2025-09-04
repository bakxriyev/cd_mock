import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Exam } from "./exam.model"
import { ExamService } from "./exam.service"
import { ExamController } from "./exam.controller"

@Module({
  imports: [SequelizeModule.forFeature([Exam])],
  providers: [ExamService],
  controllers: [ExamController],
  exports: [ExamService],
})
export class ExamModule {}
