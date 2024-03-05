export class CreateUserDTO {
    name: string;
    email: string;
    role: "INTERN" | "ENGINEER" | "ADMIN";
}