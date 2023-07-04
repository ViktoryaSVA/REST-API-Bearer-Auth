import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../users/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(@InjectRepository(User) usersRepository: Repository<User>) {
        super(usersRepository);
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return this.repo.save(user);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.repo.findOne({ where: { username } });
    }
}
