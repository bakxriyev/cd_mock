import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { UserService } from "../user/user.service"
import type { LoginDto } from "./dto/login.dto"
import type { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username)
    if (user && user.password === password) {
      const { password, ...result } = user.toJSON()
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password)
    if (!user) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi")
    }

    const payload = { username: user.username, sub: user.id}
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN"),
    })

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN"),
    })

    await this.userService.updateRefreshToken(user.id, refreshToken)

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto)
    const { password, ...result } = user.toJSON()
    return result
  }

  async refreshToken(refreshToken: string, userId: number) {
  try {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
    })

    const user = await this.userService.findOne(userId)
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException("Invalid refresh token")
    }

    const newPayload = { username: user.username, sub: user.id }
    const newAccessToken = this.jwtService.sign(newPayload, {
      secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
      expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES_IN"),
    })

    return { access_token: newAccessToken }
  } catch {
    throw new UnauthorizedException("Invalid refresh token")
  }
}

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null)
    return { message: "Logged out successfully" }
  }
}
