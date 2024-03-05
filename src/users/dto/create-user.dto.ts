import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
        message: 'Valid role required.'
    })
    role: string;
}