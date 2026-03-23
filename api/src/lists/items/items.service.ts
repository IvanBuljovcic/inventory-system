import { Injectable } from "@nestjs/common";
import { Item } from "../../generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ItemsService {
	constructor(private prisma: PrismaService) {}

	async findAll(userId: string, listId: string): Promise<Item[]> {
		return this.prisma.item.findMany({
			where: {
				listId,
				list: {
					accesses: {
						some: { userId },
					},
				},
			},
		});
	}
}
