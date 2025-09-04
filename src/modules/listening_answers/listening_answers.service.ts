import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { ListeningAnswer } from "./entities/listening_answer.entity"
import { CreateListeningAnswerDto, UpdateListeningAnswerDto } from "./dto"
import { ListeningQuestion } from "../listening_question/entities/listening_question.entity"

@Injectable()
export class ListeningAnswerService {
  constructor(@InjectModel(ListeningAnswer)
    private model: typeof ListeningAnswer,

              @InjectModel(ListeningQuestion)
    private questionModel: typeof ListeningQuestion) {}

async create(dto: CreateListeningAnswerDto): Promise<ListeningAnswer> {
  const question = await this.questionModel.findByPk(dto.listening_question_id)
  if (!question) {
    throw new NotFoundException("Listening question not found")
  }

  // ✅ correct_answersni array deb ishlatish
  const correctAnswers: string[] = question.correct_answers || []

  const isCorrect = correctAnswers.some(
    (ans) => ans.trim().toLowerCase() === dto.user_answer.trim().toLowerCase(),
  )

  return this.model.create({
    ...dto,
    is_correct: isCorrect,
    submitted_at: new Date(),
  })
}

  async findAll(): Promise<ListeningAnswer[]> {
    return this.model.findAll({ include: { all: true } })
  }

  async findOne(id: number): Promise<ListeningAnswer> {
    const answer = await this.model.findByPk(id, { include: { all: true } })
    if (!answer) throw new NotFoundException("ListeningAnswer not found")
    return answer
  }

  async update(id: number, dto: UpdateListeningAnswerDto): Promise<ListeningAnswer> {
    const answer = await this.findOne(id)
    return answer.update(dto)
  }

  async remove(id: number): Promise<void> {
    const answer = await this.findOne(id)
    await answer.destroy()
  }
}
