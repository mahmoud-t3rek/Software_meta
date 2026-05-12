import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {  UserRegistarDto } from './dto/registar.dto';
import { UserRepository } from '../../DB';
import { compareHash, genreteHash } from '../../common';
import { LoginUserDto } from './dto/login.dto';
import { TokenService } from '../../common/utils/Token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo:UserRepository,
    private readonly tokenService:TokenService,
  ) {}
async Registar(body:UserRegistarDto){
const {name,email,password}=body

const finduser=await this.userRepo.findOne({email})

if(finduser){
  throw new BadRequestException('Email already exists');
}
const hashPassword=await genreteHash(password)

const user=await this.userRepo.create({
  name,
  email,
  password:hashPassword
})
const { password:_, ...safeUser } = user;
return {message: 'User created successfully',safeUser}
}
async Login(body:LoginUserDto){
 const { email, password } = body;

    const user= await this.userRepo.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const isMatch = await compareHash(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const { accessToken, refreshToken } = await this.tokenService.GenerateCredentials(user);

    return { message: 'Login successfully', Credentials: { accessToken, refreshToken } };
}


}
