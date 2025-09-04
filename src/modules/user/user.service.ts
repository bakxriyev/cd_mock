import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "./user.model"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
  ) {}

  async create(dto: CreateUserDto, photo?: string) {
    return this.userRepo.create({ ...dto, photo } as any)
  }

  async findAll() {
    return this.userRepo.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return this.userRepo.findByPk(id, { include: { all: true } })
  }

  async update(id: number, dto: UpdateUserDto, photo?: string) {
    const user = await this.findOne(id)
    return user.update({ ...dto, ...(photo && { photo }) })
  }

  async remove(id: number) {
    const user = await this.findOne(id)
    return user.destroy()
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.findOne(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user.update({ refreshToken })
  }

  async removeRefreshToken(userId: number) {
    const user = await this.findOne(userId)
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user.update({ refreshToken: null })
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({ where: { username } })
  }
  
}
