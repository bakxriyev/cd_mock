import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { ReadingQuestion } from "./model/reading_question.entity"
import { CreateReadingQuestionDto, UpdateReadingQuestionDto } from "./dto"

@Injectable()
export class ReadingQuestionService {
  constructor(
    @InjectModel(ReadingQuestion) private readonly questionRepo: typeof ReadingQuestion
  ) {}

  async create(dto: CreateReadingQuestionDto, file?: string): Promise<ReadingQuestion> {
    return this.questionRepo.create({
      ...dto,
      options: dto.options ?? [],
      ...(file && { photo: file }),
    })
  }

  async findAll(): Promise<ReadingQuestion[]> {
    return this.questionRepo.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<ReadingQuestion> {
    const question = await this.questionRepo.findByPk(id, { include: { all: true } })
    if (!question) throw new NotFoundException("ReadingQuestion not found")
    return question
  }

  async update(id: number, dto: UpdateReadingQuestionDto, file?: string): Promise<ReadingQuestion> {
    const question = await this.findOne(id)
    return question.update({
      ...dto,
      options: dto.options ?? question.options,
      photo: file ?? question.photo,
    })
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id)
    await question.destroy()
  }
}
