import { PartialType } from "@nestjs/swagger"
import { CreateReadingDto } from "./create-reading"

export class UpdateReadingDto extends PartialType(CreateReadingDto) {}
