import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ReadingAnswer } from "./entities/reading_answer.entity";
import { CreateReadingAnswerDto, UpdateReadingAnswerDto } from "./dto";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";

@Injectable()
export class ReadingAnswersService {
  constructor(
    @InjectModel(ReadingAnswer) private readonly answerRepo: typeof ReadingAnswer,
    @InjectModel(ReadingQuestion) private readonly questionRepo: typeof ReadingQuestion,
  ) {}

  // Create answer
  async create(dto: CreateReadingAnswerDto) {
    const question = await this.questionRepo.findByPk(dto.questionId);
    if (!question) throw new NotFoundException("Question not found");

    // Foydalanuvchi javobini tozalash
    const userAnswer = dto.answer.trim();

    // Correct answersni normalize qilish (trim + lowercase)
    const correctNormalized = question.correct_answers?.map(a => a.trim().toLowerCase()) ?? [];

    // Tekshirish: userAnswer lowercase bilan solishtiriladi
    const isCorrect = correctNormalized.includes(userAnswer.toLowerCase());

    return this.answerRepo.create({ ...dto, answer: userAnswer, is_correct: isCorrect });
  }

  // Update answer
  async update(id: number, dto: UpdateReadingAnswerDto) {
    const answer = await this.answerRepo.findByPk(id);
    if (!answer) throw new NotFoundException("Answer not found");

    if (dto.answer) {
      const question = await this.questionRepo.findByPk(answer.questionId);
      if (!question) throw new NotFoundException("Question not found");

      const userAnswer = dto.answer.trim();
      const correctNormalized = question.correct_answers?.map(a => a.trim().toLowerCase()) ?? [];
      const isCorrect = correctNormalized.includes(userAnswer.toLowerCase());

      return answer.update({ ...dto, answer: userAnswer, is_correct: isCorrect });
    }

    return answer.update(dto);
  }

  async findAll() {
    return this.answerRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return this.answerRepo.findByPk(id, { include: { all: true } });
  }

  async remove(id: number) {
    const answer = await this.answerRepo.findByPk(id);
    if (!answer) throw new NotFoundException("Answer not found");
    return answer.destroy();
  }
}
