import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { Reading } from "./reading.model"
import { CreateReadingDto } from "./dto/create-reading"
import { UpdateReadingDto } from "./dto/update-rading"

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading) readonly readingRepository: typeof Reading
  ) {}

  async create(dto: CreateReadingDto): Promise<Reading> {
    return this.readingRepository.create(dto)
  }

  async findAll(): Promise<Reading[]> {
    return this.readingRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<Reading> {
    const reading = await this.readingRepository.findByPk(id, { include: { all: true } })
    if (!reading) throw new NotFoundException("Reading not found")
    return reading
  }

  async update(id: number, dto: UpdateReadingDto): Promise<Reading> {
    const reading = await this.findOne(id)
    return reading.update(dto)
  }

  async remove(id: number): Promise<void> {
    const reading = await this.findOne(id)
    await reading.destroy()
  }
}
