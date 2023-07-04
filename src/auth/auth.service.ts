import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ILoginResult } from "../interfaces/auth.interface";
import { User } from "../users/entities/users.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}
    async validateUser(username: string, password: string): Promise<User> {
        try {
            const user = await this.userService.findByUsername(username);
            if (user && user.password === password) {
                const result = { ...user };
                return result;
            }
            return null;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(username: string, password: string): Promise<ILoginResult> {
        try {
            const user = await this.validateUser(username, password);
            if (!user) {
                return { message: 'Invalid credentials' };
            }
            const payload = { username: user.username, password: user.password };
            const token = this.jwtService.sign(payload);
            return { access_token: token };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
