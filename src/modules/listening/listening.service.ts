import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Listening } from "./listening.model"
import { CreateListeningDto, UpdateListeningDto } from "./dto"

@Injectable()
export class ListeningService {
  constructor(@InjectModel(Listening) private listeningModel: typeof Listening) {}

  async create(dto: CreateListeningDto, audio_file: string): Promise<Listening> {
    return this.listeningModel.create({
      ...dto,
      audio_url: `/uploads/listening/${audio_file}`,
      created_at: new Date(),
    })
  }

  async findAll(): Promise<Listening[]> {
    return this.listeningModel.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<Listening> {
    const listening = await this.listeningModel.findByPk(id, { include: { all: true } })
    if (!listening) throw new NotFoundException("Listening not found")
    return listening
  }

  async update(id: number, dto: UpdateListeningDto, audio_file?: string): Promise<Listening> {
    const listening = await this.findOne(id)
    await listening.update({
      ...dto,
      ...(audio_file ? { audio_url: `/uploads/listening/${audio_file}` } : {}),
    })
    return listening
  }

  async remove(id: number): Promise<void> {
    const listening = await this.findOne(id)
    await listening.destroy()
  }
}
