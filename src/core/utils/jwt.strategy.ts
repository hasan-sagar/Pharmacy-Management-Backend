import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'k&2eYS.nWY5r_Jf',
    });
  }

  async validate(payload) {
    console.log(payload);
    return {
      userId: payload.userId,
      email: payload.email,
    };
  }
}
