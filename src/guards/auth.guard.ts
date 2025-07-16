import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('Token không được cung cấp!')
    }
    try {
      const decoded = this.jwtService.verify(token)
      request.email = decoded.email
    } catch (error) {
      Logger.error(error.message)
      throw new UnauthorizedException('Token không hợp lệ!')
    }
    return true
  }

  extractTokenFromHeader(request: any): string | null {
    return request.headers?.authorization?.split(' ')[1]
  }
}
