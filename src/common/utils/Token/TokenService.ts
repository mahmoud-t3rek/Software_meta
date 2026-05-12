import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../../../DB/models/user.model';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
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
}