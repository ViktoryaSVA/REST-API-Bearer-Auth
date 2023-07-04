import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ILoginResult} from "../interfaces/auth.interface";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: any): Promise<ILoginResult> {
        return this.authService.login(body.username, body.password);
    }
}
