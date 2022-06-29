import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      // 시크릿키
      secret: 'Secret1234',
      // 유효시간 = 1시간
      signOptions:{
        expiresIn: 60* 60
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  // auth모듈에서 사용가능하게 등록
  providers: [JwtStrategy, AuthService],
  // 다른모듈에서 사용가능하게 등록
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
