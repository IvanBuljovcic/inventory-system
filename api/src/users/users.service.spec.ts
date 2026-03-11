import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../generated/prisma";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "./users.service";

describe("UserService", () => {
	let service: UsersService;

	const mockUser: User = {
		id: "1",
		email: "test@mail.com",
		name: "Test User",
		createdAt: new Date(),
		updatedAt: new Date(),
		passwordHash: "asdf",
		role: "ADMIN",
	};

	const mockPrismaService = {
		user: {
			findMany: jest.fn(),
			findUnique: jest.fn(),
			create: jest.fn(),
			update: jest.fn(),
			delete: jest.fn(),
		},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("findAll", () => {
		it("Should return an empty array when no users exist in the database", async () => {
			mockPrismaService.user.findMany.mockResolvedValue([]);

			const result = await service.findAll();

			expect(result).toEqual([]);
		});

		it("Should return an array with one user when database has exactly one user", async () => {
			mockPrismaService.user.findMany.mockResolvedValue([mockUser]);

			const result = await service.findAll();

			expect(result).toEqual([mockUser]);
		});

		it("Should return an array with multiple users when database has multiple users", async () => {
			const users = [
				mockUser,
				{ ...mockUser, id: "2", email: "test_2@mail.com", name: "Test User 2" },
				{ ...mockUser, id: "3", email: "test_3@mail.com", name: "Test User 3" },
			];
			mockPrismaService.user.findMany.mockResolvedValue([users]);

			const result = await service.findAll();

			expect(result).toEqual([users]);
		});

		it("Should verify that the Prisma findMany method is called exactly once", async () => {
			mockPrismaService.user.findMany.mockResolvedValue([mockUser]);

			await service.findAll();

			expect(mockPrismaService.user.findMany).toHaveBeenCalledTimes(1);
		});

		it("Should verify that the Prisma findMany method is called with no parameters", async () => {
			mockPrismaService.user.findMany.mockResolvedValue([mockUser]);

			await service.findAll();

			expect(mockPrismaService.user.findMany).toHaveBeenLastCalledWith();
		});
	});

	// 	findOne(id)

	//   1. Should return a user object when a valid ID is provided and user exists
	//   2. Should return null when the user ID doesn't exist in the database
	//   3. Should verify that Prisma's findUnique is called with the correct ID in the where clause
	//   4. Should return the correct user when multiple users exist in database
	//   5. Should handle empty string IDs gracefully

	describe("findOne", () => {
		it("Should return a user object when a valid ID is provided and user exists'", async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

			const result = await service.findOne("1");

			expect(result).toEqual(mockUser);
		});

		it("Should return null when the user ID doesn't exist in the database'", async () => {
			mockPrismaService.user.findUnique.mockResolvedValue(null);

			const result = await service.findOne("non-existent-id");

			expect(result).toBeNull();
		});

		it("Should verify that Prisma's findUnique is called with the correct ID in the where clause'", async () => {
			// mockPrismaService.user.findUnique.mockResolvedValue()

			await service.findOne("unique-id");

			expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith("unique-id");
		});

		it("Should return the correct user when multiple users exist in database'", async () => {});

		it("Should handle empty string IDs gracefully'", async () => {});
	});

	//   create(data)

	//   1. Should create and return a new user with valid email and name
	//   2. Should create a user with all required fields (including passwordHash and role based on your schema)
	//   3. Should verify that Prisma's create method is called with the exact data passed in
	//   4. Should return the newly created user with generated ID and timestamps
	//   5. Should handle creating multiple users with different data correctly

	//   update(id, data)

	//   1. Should update and return the user when valid ID and data are provided
	//   2. Should update only the fields provided (partial update)
	//   3. Should verify that Prisma's update is called with correct ID in where clause and data
	//   4. Should return the updated user with modified fields
	//   5. Should handle updating just the name without affecting email
	//   6. Should handle updating just the email without affecting name

	//   remove(id)

	//   1. Should delete and return the deleted user when valid ID is provided
	//   2. Should verify that Prisma's delete is called with the correct ID in where clause
	//   3. Should return the user data that was deleted
	//   4. Should handle deletion of different users by different IDs

	//   General/Edge Cases

	//   1. The service should be defined after module compilation
	//   2. The PrismaService should be properly injected into UsersService
	//   3. Mock functions should be cleared between tests to avoid test pollution
});
