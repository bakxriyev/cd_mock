import { Module } from "@nestjs/common"
import { SequelizeModule } from "@nestjs/sequelize"
import { Listening } from "./listening.model"
import { ListeningService } from "./listening.service"
import { ListeningController } from "./listening.controller"

@Module({
  imports: [SequelizeModule.forFeature([Listening])],
  providers: [ListeningService],
  controllers: [ListeningController],
  exports: [ListeningService],
})
export class ListeningModule {}
