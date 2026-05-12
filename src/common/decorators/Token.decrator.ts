import { SetMetadata } from '@nestjs/common';
import { TokenEnum } from '../enums/token.enum';

export const TokenName = 'TokenName';

export const Token = (TokenType: TokenEnum) => {
  return SetMetadata(TokenName, TokenType);
};  