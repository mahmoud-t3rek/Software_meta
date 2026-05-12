
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../DB';
import { TokenEnum } from '../enums/token.enum';
export interface ICredentiales {
  decoded: JwtPayload;
  user:  User;
}

export interface IAuth extends Request {
  Credentiales: ICredentiales;
  tokenType?: TokenEnum;
}
