import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Exam } from "../../exam/exam.model";
import { WritingAnswer } from "../../writing_answers/entities/writing_answer.entity";
import { WritingPart } from "./writing-parts";

@Table({ tableName: "writing", timestamps: false })
export class Writing extends Model<Writing> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  exam_id: number;

  @Column({
    type: DataType.ENUM(...Object.values(WritingPart)),
    allowNull: false,
  })
  part: WritingPart

  @Column(DataType.TEXT)
  task_text: string;

  @Column({ type: DataType.STRING, allowNull: true })
  task_image: string | null;

  @Column(DataType.DATE)
  created_at: Date;

  @BelongsTo(() => Exam)
  exam: Exam;

  @HasMany(() => WritingAnswer)
  answers: WritingAnswer[];
}
