import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	ParseIntPipe,
} from "@nestjs/common";
import type { UsersService } from "./users.service";
import type { User, Prisma } from "../generated/prisma";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id", ParseIntPipe) id: number): Promise<User | null> {
		return this.usersService.findOne(id);
	}

	@Post()
	async create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
		return this.usersService.create(createUserDto);
	}

	@Put(":id")
	async update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateUserDto: Prisma.UserUpdateInput,
	): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id", ParseIntPipe) id: number): Promise<User> {
		return this.usersService.remove(id);
	}
}
