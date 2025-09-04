import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Reading } from "./reading.model"
import { ReadingService } from "./reading.service"
import { ReadingController } from "./reading.controller"

@Module({
  imports: [SequelizeModule.forFeature([Reading])],
  controllers: [ReadingController],
  providers: [ReadingService],
  exports: [ReadingService],
})
export class ReadingModule {}
