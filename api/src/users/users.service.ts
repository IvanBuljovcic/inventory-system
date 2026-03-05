import { Injectable } from "@nestjs/common";
import type { PrismaService } from "../prisma/prisma.service";
import type { User, Prisma } from "../generated/prisma";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany({
			include: {
				posts: true,
			},
		});
	}

	async findOne(id: number): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { id },
			include: {
				posts: true,
			},
		});
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async remove(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
