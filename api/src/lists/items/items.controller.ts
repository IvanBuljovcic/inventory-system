import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import type { AuthUser } from "../../common/interfaces/auth-user.interface";
import { Item } from "../../generated/prisma";
import { ItemsService } from "./items.service";

@Controller("items")
@UseGuards(AuthGuard)
export class ItemsController {
	constructor(private readonly itemsService: ItemsService) {}

	@Get()
	async findAll(@CurrentUser() user: AuthUser, @Param("listId") listId: string): Promise<Item[] | null> {
		return this.itemsService.findAll(user.id, listId);
	}
}
