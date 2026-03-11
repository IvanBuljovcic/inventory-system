import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserRole } from "../generated/prisma";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(8)
	passwordHash!: string;

	@IsEnum(UserRole)
	role!: UserRole;
}
