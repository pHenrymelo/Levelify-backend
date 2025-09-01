import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { FetchPriorityQuestsUseCase } from './fetch-priority-quests';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: FetchPriorityQuestsUseCase;

describe('Fetch quest by priority use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new FetchPriorityQuestsUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able fetch quests by priority first', async () => {
		await inMemoryQuestsRepository.create(
			MakeQuest({
				dueDate: new Date(2025, 10, 25),
			}),
		);

		await inMemoryQuestsRepository.create(
			MakeQuest({
				dueDate: new Date(2025, 10, 20),
			}),
		);

		await inMemoryQuestsRepository.create(
			MakeQuest({
				dueDate: new Date(2025, 10, 23),
			}),
		);

		const result = await sut.execute({
			page: 1,
		});

		expect(result.isRight()).toEqual(true);
		expect(result.value?.quests).toEqual([
			expect.objectContaining({ dueDate: new Date(2025, 10, 20) }),
			expect.objectContaining({ dueDate: new Date(2025, 10, 23) }),
			expect.objectContaining({ dueDate: new Date(2025, 10, 25) }),
		]);
	});

	it('Shoud be able fetch paginated quests', async () => {
		for (let index = 0; index < 25; index++) {
			await inMemoryQuestsRepository.create(
				MakeQuest({
					dueDate: new Date(2025, 10, 25),
				}),
			);
		}

		const result = await sut.execute({
			page: 2,
		});

		expect(result.isRight()).toEqual(true);
		expect(result.value?.quests).toHaveLength(5);
	});
});
