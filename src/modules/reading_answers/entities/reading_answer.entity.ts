import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { User } from "../../user/user.model"
import { ReadingQuestion } from "../../reading_question/model/reading_question.entity"
import { Exam } from "../../exam/exam.model"

@Table({
  tableName: "reading_answers",
  timestamps: true,
})
export class ReadingAnswer extends Model<ReadingAnswer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number
  
  @BelongsTo(() => User)
  user: User

  @ForeignKey(() => ReadingQuestion)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number
  
  @BelongsTo(() => ReadingQuestion)
  question: ReadingQuestion

  @ForeignKey(() => Exam)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  examId: number
  @BelongsTo(() => Exam)
  exam: Exam

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  answer: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  is_correct: boolean
}
