import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../utils/Token';
import { TokenEnum } from '../enums/token.enum';
import { IAuth } from '../interface/token.interface';
import { TokenName } from '../decorators/Token.decrator';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenType =
      this.reflector.getAllAndOverride<TokenEnum>(TokenName, [
        context.getHandler(),
        context.getClass(),
      ]) ?? TokenEnum.AcessToken;

    if (context.getType() !== 'http') {
      return false;
    }

    const request = context.switchToHttp().getRequest<IAuth>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const { user, decoded } = await this.tokenService.Decoded({
      Authorization: authHeader,
      TokenType: tokenType,
    });


    request.Credentiales = { decoded, user };
    request.tokenType = tokenType;

    return true;
  }
}
