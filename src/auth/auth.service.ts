import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    // 회원가입
    async signUp(AuthCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.createUser(AuthCredentialsDto);
    }

    // 로그인
    async signIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
        const {username, password} = AuthCredentialsDto;
        const user = await this.userRepository.findOne({username});

        if(user && (await bcrypt.compare(password, user.password))){
            // 로그인시 jwt 생성(Secret + payload)
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        }else{
            throw new UnauthorizedException('login failed');
        }
    }
}
