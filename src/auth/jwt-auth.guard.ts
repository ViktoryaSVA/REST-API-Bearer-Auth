import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const bearerToken = request.headers.authorization;

        if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
            return false;
        }

        return super.canActivate(context);
    }
}
