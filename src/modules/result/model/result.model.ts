import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../../user/user.model";
import { Exam } from "../../exam/exam.model";

@Table({ tableName: "results", timestamps: false })
export class Result extends Model<Result> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT })
  user_id: number;

  @ForeignKey(() => Exam)
  @Column({ type: DataType.BIGINT })
  exam_id: number;

  @Column({ type: DataType.INTEGER })
  reading_total_questions: number;

  @Column({ type: DataType.INTEGER })
  reading_correct_answers: number;

  @Column({ type: DataType.INTEGER })
  listening_total_questions: number;

  @Column({ type: DataType.INTEGER })
  listening_correct_answers: number;

  @Column({ type: DataType.INTEGER })
  writing_score: number;

  @Column({ type: DataType.STRING })
  speaking_score: string;

  @Column({ type: DataType.DATE })
  taken_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Exam)
  exam: Exam;
}
