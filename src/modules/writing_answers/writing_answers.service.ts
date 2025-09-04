import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { WritingAnswer } from "./entities/writing_answer.entity"
import { CreateWritingAnswerDto, UpdateWritingAnswerDto } from "./dto"

@Injectable()
export class WritingAnswersService {
  constructor(@InjectModel(WritingAnswer) private writingAnswerRepo: typeof WritingAnswer) {}

  async create(dto: CreateWritingAnswerDto,) {
    return await this.writingAnswerRepo.create({
      ...dto,
      submitted_at: new Date()
    })
  }

  async findAll() {
    return await this.writingAnswerRepo.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    const answer = await this.writingAnswerRepo.findByPk(id, { include: { all: true } })
    if (!answer) throw new NotFoundException("Writing answer not found")
    return answer
  }

  async update(id: number, dto: UpdateWritingAnswerDto, ) {
    const answer = await this.findOne(id)
    await answer.update({
      ...dto,

    })
    return answer
  }

  async remove(id: number) {
    const answer = await this.findOne(id)
    await answer.destroy()
    return { message: "Deleted successfully" }
  }
}
