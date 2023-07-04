import { config } from 'dotenv';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import {User} from "../users/entities/users.entity";

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        try {
            const user = await this.authService.validateUser(payload.username, payload.password);

            if (!user) {
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
