import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Reading } from "../../reading/reading.model"
import { ReadingPart } from "./reading-parts.enum"

@Table({
  tableName: "reading_questions",
  timestamps: true,
})
export class ReadingQuestion extends Model<ReadingQuestion> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => Reading)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reading_id: number;

  @BelongsTo(() => Reading)
  reading: Reading

  @Column({
    type: DataType.ENUM(...Object.values(ReadingPart)),
    allowNull: false,
  })
  part: ReadingPart

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  question_text: string

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  options: string[]

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: true,
  })
  correct_answers: string[]

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo: string
}
