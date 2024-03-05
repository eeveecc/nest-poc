import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    // mock data
    private ROLES = ['INTERN', 'ENGINEER', 'ADMIN']
    private users = [
        {'id': 1, 'name': 'Alice Smith', 'email': 'alice.smith@example.com', 'role': 'INTERN'},
        {'id': 2, 'name': 'Bob Johnson', 'email': 'bob.johnson@example.com', 'role': 'ADMIN'},
        {'id': 3, 'name': 'Cindy Brown', 'email': 'cindy.brown@example.com', 'role': 'ENGINEER'},
        {'id': 4, 'name': 'Dan Wilson', 'email': 'dan.wilson@example.com', 'role': 'INTERN'},
        {'id': 5, 'name': 'Eva Davis', 'email': 'eva.davis@example.com', 'role': 'ENGINEER'}
    ]
    
    findAll(role?: string) {
        if (this.ROLES.includes(role)) {
            const foundUsers = this.users.filter(user => user.role === role);
            if (foundUsers.length === 0) throw new NotFoundException('User Role Not Found.')
            return foundUsers;
        }
        return this.users;
    }

    findOne(id: number) {
        const foundUser = this.users.find(user => user.id === id);
        if (!foundUser) throw new NotFoundException("User is not found.");
    }

    create(createUserDTO: CreateUserDTO) {
        const usersSortedByIdDesc = [...this.users].sort((a, b) => b.id - a.id);
        if (this.ROLES.includes(createUserDTO.role)) {
            const newUser = {
                id: usersSortedByIdDesc[0].id,
                ...createUserDTO
            }
            this.users.push(newUser)
        }
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) return {...user, ...updateUserDto}
            return user
        })
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
    
}
