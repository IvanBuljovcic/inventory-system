import { Injectable, type OnModuleDestroy, type OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		const connectionString = process.env.DATABASE_URL;

		if (!connectionString) {
			throw new Error("DATABASE_URL environment variable is not set");
		}

		// Create a connection pool
		const pool = new Pool({ connectionString });

		// Initialize PrismaClient with the PostgreSQL adapter
		super({
			adapter: new PrismaPg(pool),
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}
