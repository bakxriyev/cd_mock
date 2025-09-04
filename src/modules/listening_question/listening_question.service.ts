import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ListeningQuestion } from "./entities/listening_question.entity";
import { CreateListeningQuestionDto, UpdateListeningQuestionDto } from "./dto";

@Injectable()
export class ListeningQuestionService {
  constructor(
    @InjectModel(ListeningQuestion)
    private readonly questionModel: typeof ListeningQuestion,
  ) {}

  async create(dto: CreateListeningQuestionDto, audio?: string): Promise<ListeningQuestion> {
    return this.questionModel.create({
      ...dto,
      options: dto.options as any, // controllerda arrayga aylantiriladi
      correct_answers: dto.correct_answers as any,
      audio,
      created_at: new Date(),
    });
  }

  async findAll(): Promise<ListeningQuestion[]> {
    return this.questionModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<ListeningQuestion> {
    const question = await this.questionModel.findByPk(id, { include: { all: true } });
    if (!question) throw new NotFoundException("Listening question not found");
    return question;
  }

  async update(id: number, dto: UpdateListeningQuestionDto, photo?: string): Promise<ListeningQuestion> {
  const question = await this.findOne(id);

  // options va correct_answersni arrayga aylantirish
  const optionsArray: string[] | undefined = dto.options
    ? Array.isArray(dto.options)
      ? dto.options
      : dto.options.split(",").map(o => o.trim())
    : undefined;

  const correctAnswersArray: string[] | undefined = dto.correct_answers
    ? Array.isArray(dto.correct_answers)
      ? dto.correct_answers
      : dto.correct_answers.split(",").map(a => a.trim())
    : undefined;

  return question.update({
    ...dto,
    options: optionsArray ?? question.options,
    correct_answers: correctAnswersArray ?? question.correct_answers,
    audio: photo ?? question.audio,
  });
}


  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await question.destroy();
  }
}
