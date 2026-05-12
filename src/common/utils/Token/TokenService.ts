import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../../DB/models/user.model';
import { TokenEnum } from '../../enums/token.enum';
import { UserRepository } from '../../../DB';
import { TokenRepository } from '../../../DB/repository/token.repository';

export type Credential = {
  user: User;
  decoded: JwtPayload;
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly tokenRepo: TokenRepository,
  ) {}

  createToken = async ({
    payload,
    options,
  }: {
    payload: object;
    options?: JwtSignOptions;
  }): Promise<string> => {
    return this.jwtService.signAsync(payload, options);
  };

  verifyToken = async ({
    token,
    secret,
    options,
  }: {
    token: string;
    secret: string;
    options?: JwtVerifyOptions;
  }): Promise<JwtPayload> => {
    return this.jwtService.verifyAsync(token, {
      ...options,
      secret,
    });
  };

  GenerateCredentials = async (user: User) => {
    const jwtid = randomUUID();

    const accessToken = await this.createToken({
      payload: {
        userId: user.id,
        email: user.email,
      },
      options: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '1h',
        jwtid,
      },
    });

    const refreshToken = await this.createToken({
      payload: {
        userId: user.id,
        email: user.email,
      },
      options: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
        jwtid,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  };

  Decoded = async ({
    Authorization,
    TokenType,
  }: {
    Authorization: string;
    TokenType: TokenEnum;
  }): Promise<Credential> => {
    const [Bearer, token] = Authorization.split(' ');

    if (Bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    const secret =
      TokenType === TokenEnum.AcessToken
        ? process.env.ACCESS_TOKEN_SECRET!
        : process.env.REFRESH_TOKEN_SECRET!;

    let decoded: JwtPayload;

    try {
      decoded = await this.verifyToken({
        token,
        secret,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    if (!decoded?.userId) {
      throw new BadRequestException('Invalid token payload');
    }

    if (
      decoded.jti &&
      (await this.tokenRepo.findOne({ jti: decoded.jti }))
    ) {
      throw new UnauthorizedException('Token has been invalidated');
    }

    const user = await this.userRepo.findOne({
      id: Number(decoded.userId),
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user,
      decoded,
    };
  };
}