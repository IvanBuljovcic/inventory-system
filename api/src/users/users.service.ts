import { BadRequestException, Injectable } from "@nestjs/common";
import type { User } from "../generated/prisma";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./create-user.dto";
import { UpdateUserDto } from "./update-user.dto";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async findOne(id: string): Promise<User | null> {
		if (!id || id.trim() === "") {
			throw new BadRequestException("User ID is required and cannot be empty");
		}

		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async create(data: CreateUserDto): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async update(id: string, data: UpdateUserDto): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async remove(id: string): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
