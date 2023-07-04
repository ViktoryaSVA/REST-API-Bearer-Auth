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
        try {
            return this.repo.save(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findByUsername(username: string): Promise<User | undefined> {
        try {
            return this.repo.findOne({ where: { username } });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
