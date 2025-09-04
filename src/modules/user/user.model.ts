import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Result } from "../result/model/result.model";
import { ListeningAnswer } from "../listening_answers/entities/listening_answer.entity";
import { WritingAnswer } from "../writing_answers/entities/writing_answer.entity";
import { SpeakingAnswer } from "../speaking_answers/entities/speaking_answer.entity";
import { ReadingAnswer } from "../reading_answers/entities/reading_answer.entity";

@Table({ tableName: "users", timestamps: false })
export class User extends Model<User> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING, unique: true })
  username: string;

  @Column({ type: DataType.STRING })
  password: string;

  // Refresh token maydoni
  @Column({ type: DataType.STRING, allowNull: true })
  refreshToken: string;

  @HasMany(() => Result)
  results: Result[];

  @HasMany(() => WritingAnswer)
  writingAnswers: WritingAnswer[];

  @HasMany(() => SpeakingAnswer)
  speakingAnswers: SpeakingAnswer[];

  @HasMany(() => ListeningAnswer)
  listeningAnswers: ListeningAnswer[];

  @HasMany(() => ReadingAnswer)
  readingAnswers: ReadingAnswer[];

  

}
