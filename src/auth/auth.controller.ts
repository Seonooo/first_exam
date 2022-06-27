import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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
}