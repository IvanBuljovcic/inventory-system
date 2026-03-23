import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import type { AuthUser } from "../common/interfaces/auth-user.interface";
import { List } from "../generated/prisma";
import { CreateListDto } from "./create-list.dto";
import { ListsService } from "./lists.service";

@Controller("lists")
@UseGuards(JwtAuthGuard)
export class ListsController {
	constructor(private readonly listsService: ListsService) {}

	@Get()
	async findAll(@CurrentUser() user: AuthUser): Promise<List[] | null> {
		return this.listsService.findAll(user.id);
	}

	@Get(":listId")
	async findOne(@CurrentUser() user: AuthUser, @Param("listId") listId: string) {
		return this.listsService.findOne(user.id, listId);
	}

	@Post("create")
	async create(@CurrentUser() user: AuthUser, @Body() createListDto: CreateListDto): Promise<List | null> {
		return this.listsService.create(user.id, createListDto);
	}
}
