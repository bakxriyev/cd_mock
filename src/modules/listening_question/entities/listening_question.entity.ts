import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript"
import { Listening } from "../../listening/listening.model"
import { ListeningAnswer } from "../../listening_answers/entities/listening_answer.entity"
import { ListeningPart } from "./listening-parts"


// listening-question-type.enum.ts
export enum ListeningQuestionType {
  FORM_COMPLETION = "form_completion",          // Form/Note/Table/Flow-chart/Summary Completion
  SENTENCE_COMPLETION = "sentence_completion",  // Sentence Completion
  SHORT_ANSWER = "short_answer",                // Short Answer Questions
  MULTIPLE_CHOICE = "multiple_choice",          // Multiple Choice Questions (MCQ)
  MATCHING = "matching",                        // Matching (people, places, ideas)
  MAP_LABELING = "map_labeling",                // Map/Plan/Diagram Labelling
  PICK_FROM_LIST = "pick_from_list",            // Pick from a List
}


@Table({ tableName: "listening_questions", timestamps: false })
export class ListeningQuestion extends Model<ListeningQuestion> {
  @Column({ type: DataType.BIGINT, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => Listening)
  @Column(DataType.BIGINT)
  listening_id: number

  @Column({
    type: DataType.ENUM(...Object.values(ListeningPart)),
    allowNull: false,
  })
  part: ListeningPart

  @Column(DataType.STRING)
  title: string

  @Column(DataType.TEXT)
  question_text: string

  @Column({
    type: DataType.ENUM(...Object.values(ListeningQuestionType)),
    allowNull: false,
  })
  question_type: ListeningQuestionType

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  options: string[]

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
  })
  correct_answers: string[]

  @Column(DataType.STRING)
  audio: string

  @Column(DataType.DATE)
  created_at: Date

  @BelongsTo(() => Listening)
  listening: Listening

  @HasMany(() => ListeningAnswer)
  answers: ListeningAnswer[]
}
