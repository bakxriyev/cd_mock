import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Exam } from "../../exam/exam.model";

@Table({ tableName: "speakings", timestamps: false })
export class Speaking extends Model<Speaking> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  exam_id: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  score: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  evaluated_at: Date;

  @BelongsTo(() => Exam)
  exam: Exam;
}
