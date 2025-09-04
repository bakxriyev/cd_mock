import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Writing } from "./model/writing.model"
import { WritingService } from "./writing.service"
import { WritingController } from "./writing.controller"

@Module({
  imports: [SequelizeModule.forFeature([Writing])],
  controllers: [WritingController],
  providers: [WritingService],
  exports: [WritingService],
})
export class WritingModule {}
