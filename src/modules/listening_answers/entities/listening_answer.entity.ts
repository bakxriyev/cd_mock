import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../user/user.model"
import { Exam } from "../../exam/exam.model"
import { ListeningQuestion } from "../../listening_question/entities/listening_question.entity"

@Table({ tableName: "listening_answers", timestamps: false })
export class ListeningAnswer extends Model<ListeningAnswer> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column(DataType.BIGINT)
  userId: number

  @ForeignKey(() => Exam)
  @Column(DataType.BIGINT)
  examId: number

  @ForeignKey(() => ListeningQuestion)
  @Column(DataType.BIGINT)
  listening_question_id: number

  @Column(DataType.STRING)
  user_answer: string

  @Column(DataType.BOOLEAN)
  is_correct: boolean

  @Column(DataType.DATE)
  submitted_at: Date

  @BelongsTo(() => User)
  user: User

  @BelongsTo(() => Exam)
  exam: Exam

  @BelongsTo(() => ListeningQuestion)
  question: ListeningQuestion
}
