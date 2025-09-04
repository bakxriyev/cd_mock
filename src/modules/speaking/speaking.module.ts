import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Speaking } from "./model/speaking.model"
import { SpeakingService } from "./speaking.service"
import { SpeakingController } from "./speaking.controller"

@Module({
  imports: [SequelizeModule.forFeature([Speaking])],
  controllers: [SpeakingController],
  providers: [SpeakingService],
  exports: [SpeakingService],
})
export class SpeakingModule {}
