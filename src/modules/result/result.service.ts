import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Result } from "./model/result.model";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";
import { User } from "../user/user.model";
import { Exam } from "../exam/exam.model";
import { Reading } from "../reading/reading.model";
import { ReadingQuestion } from "../reading_question/model/reading_question.entity";
import { Listening } from "../listening/listening.model";
import { ListeningQuestion } from "../listening_question/entities/listening_question.entity";
import { UpdateResultDto } from "./dto";
import { Op } from "sequelize";

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result) private resultRepo: typeof Result,
    @InjectModel(User) private userRepo: typeof User,
    @InjectModel(Exam) private examRepo: typeof Exam,
    @InjectModel(ReadingAnswer) private readingAnswerRepo: typeof ReadingAnswer,
    @InjectModel(ListeningAnswer) private listeningAnswerRepo: typeof ListeningAnswer,
    @InjectModel(WritingAnswer) private writingAnswerRepo: typeof WritingAnswer,
    @InjectModel(SpeakingAnswer) private speakingAnswerRepo: typeof SpeakingAnswer,
  ) {}

  async findAll(): Promise<Result[]> {
    return this.resultRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepo.findByPk(id, { include: { all: true } });
    if (!result) throw new NotFoundException("Result not found");
    return result;
  }

  async create(dto: any): Promise<Result> {
    return this.resultRepo.create({ ...dto, taken_at: new Date() });
  }

  async update(id: number, dto: UpdateResultDto): Promise<Result> {
    const result = await this.findOne(id);
    return result.update(dto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.findOne(id);
    await result.destroy();
  }

  // async getUserResults(user_id: number) {
  //   const user = await this.userRepo.findByPk(user_id);
  //   if (!user) throw new NotFoundException("User not found");

  //   // Userga tegishli barcha result-larni olamiz
  //   const results = await this.resultRepo.findAll({
  //     where: { user_id: user_id }, 
  //     include: [{ all: true }],
  //   });

  //   const enrichedResults = await Promise.all(
  //     results.map(async (result) => {
  //       const exam = await this.examRepo.findByPk(result.exam_id, {
  //         include: [
  //           { model: Reading, include: [ReadingQuestion] },
  //           { model: Listening, include: [ListeningQuestion] },
  //         ],
  //       });

  //       if (!exam) return result;

  //       // --- READING ---
  //       const readingQuestionIds = exam.readings.flatMap(r => r.questions.map(q => q.id));
  //       const readingTotal = readingQuestionIds.length;
  //       const readingCorrect = await this.readingAnswerRepo.count({
  //         where: {
  //           userId: user_id,
  //           reading_question_id: { [Op.in]: readingQuestionIds },
  //           is_correct: true,
  //         },
  //       });

  //       // --- LISTENING ---
  //       const listeningQuestionIds = exam.listenings.flatMap(l => l.questions.map(q => q.id));
  //       const listeningTotal = listeningQuestionIds.length;
  //       const listeningCorrect = await this.listeningAnswerRepo.count({
  //         where: {
  //           userId: userId,
  //           listening_question_id: { [Op.in]: listeningQuestionIds },
  //           is_correct: true,
  //         },
  //       });

  //       // --- WRITING ---
  //       const writingAnswers = await this.writingAnswerRepo.findAll({
  //         where: { user_id: userId, exam_id: exam.id },
  //       });
  //       const writingScore = writingAnswers.length > 0 ? writingAnswers[0].score : null;

  //       // --- SPEAKING ---
  //       const speakingAnswers = await this.speakingAnswerRepo.findAll({
  //         where: { user_id: userId, exam_id: exam.id },
  //       });
  //       const speakingScore = speakingAnswers.length > 0 ? speakingAnswers[0].score : null;

  //       return {
  //         ...result.get({ plain: true }),
  //         reading_result: `${readingCorrect}/${readingTotal}`,
  //         listening_result: `${listeningCorrect}/${listeningTotal}`,
  //         writing_result: writingScore,
  //         speaking_result: speakingScore,
  //       };
  //     }),
  //   );

  //   return {
  //     ...user.get({ plain: true }),
  //     results: enrichedResults,
  //   };
  // }
}
