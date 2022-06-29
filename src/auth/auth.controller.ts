import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    // 회원가입
    @Post('/signup')
    signUp(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(AuthCredentialsDto);
    }

    // 로그인
    @Post('/signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
        return this.authService.signIn(AuthCredentialsDto);
    }

    // 테스트
    @Post('/test')
    // 인증미들웨어
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log('user', user);
    }
}
