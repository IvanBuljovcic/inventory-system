import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import type { Prisma, User } from "../generated/prisma";
import type { UsersService } from "./users.service";

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
	async update(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: Prisma.UserUpdateInput): Promise<User> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id", ParseIntPipe) id: number): Promise<User> {
		return this.usersService.remove(id);
	}
}
