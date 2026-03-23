import { Injectable } from "@nestjs/common";
import { List } from "../generated/prisma";
import { PrismaService } from "../prisma/prisma.service";
import { CreateListDto } from "./create-list.dto";

@Injectable()
export class ListsService {
	constructor(private prisma: PrismaService) {}

	async findAll(userId: string): Promise<List[]> {
		return this.prisma.list.findMany({
			where: {
				accesses: {
					some: {
						userId,
					},
				},
			},
		});
	}

	async findOne(userId: string, listId: string) {
		return this.prisma.list.findFirst({
			where: {
				id: listId,
				accesses: {
					some: {
						userId,
					},
				},
			},
		});
	}

	async create(userId: string, dto: CreateListDto): Promise<List> {
		return this.prisma.list.create({
			data: {
				name: dto.name,
				ownerId: userId,
			},
		});
	}
}
