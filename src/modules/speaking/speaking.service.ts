import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Speaking } from "./model/speaking.model"
import { CreateSpeakingDto, UpdateSpeakingDto } from "./dto"

@Injectable()
export class SpeakingService {
  constructor(
    @InjectModel(Speaking)
    private readonly speakingModel: typeof Speaking,
  ) {}

  async create(dto: CreateSpeakingDto): Promise<Speaking> {
    return this.speakingModel.create({ ...dto, evaluated_at: new Date() })
  }

  async findAll(): Promise<Speaking[]> {
    return this.speakingModel.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<Speaking> {
    const speaking = await this.speakingModel.findByPk(id, { include: { all: true } })
    if (!speaking) throw new NotFoundException("Speaking result not found")
    return speaking
  }

  async update(id: number, dto: UpdateSpeakingDto): Promise<Speaking> {
    const speaking = await this.findOne(id)
    return speaking.update(dto)
  }

  async remove(id: number): Promise<void> {
    const speaking = await this.findOne(id)
    await speaking.destroy()
  }
}
