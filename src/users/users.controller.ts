import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get() // GET /users?role=value
    findAll(@Query('role') role?: string) {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post() // POST /users
    create(@Body() createUserDTOser: CreateUserDTO) {
        return this.usersService.create(createUserDTOser)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') // GET /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id)
    }

}
