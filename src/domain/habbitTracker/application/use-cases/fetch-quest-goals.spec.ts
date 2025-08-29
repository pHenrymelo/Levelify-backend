import { MakeGoal } from 'test/factories/make-goal';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { FetchQuestGoalsUseCase } from './fetch-quest-goals';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: FetchQuestGoalsUseCase;

describe('Fetch a quest goals use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		sut = new FetchQuestGoalsUseCase(inMemoryGoalsRepository);
	});

	it('Shoud be able fetch a quest goals', async () => {
		const createdQuest = MakeQuest();

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
			}),
		);

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
			}),
		);

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
			}),
		);

		const result = await sut.execute({
			questId: createdQuest.id.toString(),
			page: 1,
		});

		expect(result.isRight()).toEqual(true);
		expect(result.value?.goals).toHaveLength(3);
	});

	it('Shoud be able fetch paginated quest goals', async () => {
		const createdQuest = MakeQuest();
		for (let index = 0; index < 25; index++) {
			await inMemoryGoalsRepository.create(
				MakeGoal({
					questId: createdQuest.id,
				}),
			);
		}

		const result = await sut.execute({
			questId: createdQuest.id.toString(),
			page: 2,
		});

		expect(result.isRight()).toEqual(true);
		expect(result.value?.goals).toHaveLength(5);
	});

	it('Shoud be able get a quest goals conclusion percentual', async () => {
		const createdQuest = MakeQuest();

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
				completed: true,
			}),
		);

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
				completed: true,
			}),
		);

		await inMemoryGoalsRepository.create(
			MakeGoal({
				questId: createdQuest.id,
			}),
		);

		const result = await sut.execute({
			questId: createdQuest.id.toString(),
			page: 1,
		});

		expect(result.isRight()).toEqual(true);
		expect(result.value?.conclusionPercentual).toEqual(67);
	});
});
