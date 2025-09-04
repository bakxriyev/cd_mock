import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Exam } from "../exam/exam.model";
import { ListeningQuestion } from "../listening_question/entities/listening_question.entity";

@Table({ tableName: "listenings", timestamps: false })
export class Listening extends Model<Listening> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Exam)
  @Column(DataType.INTEGER)
  exam_id: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  audio_url: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.DATE)
  created_at: Date;

  @HasMany(() => ListeningQuestion)
  questions: ListeningQuestion[];

  @BelongsTo(() => Exam, { foreignKey: "exam_id", targetKey: "id" })
  exam: Exam;
}
