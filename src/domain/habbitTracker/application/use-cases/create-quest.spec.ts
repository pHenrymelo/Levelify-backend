import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CreateQuestUseCase } from './create-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: CreateQuestUseCase;

describe('Create quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new CreateQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able create a quest', async () => {
		const result = await sut.execute({
			playerId: 'player-1-teste-id',
			title: 'quest-1 teste',
			description: 'quest description',
			rewardIds: ['001', '002'],
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryQuestsRepository.items[0]).toEqual(result.value?.quest);
		expect(inMemoryQuestsRepository.items[0].rewards.currentItems).toHaveLength(
			2,
		);
		expect(inMemoryQuestsRepository.items[0].rewards.currentItems).toEqual([
			expect.objectContaining({
				rewardId: new UniqueEntityID('001'),
			}),
			expect.objectContaining({
				rewardId: new UniqueEntityID('002'),
			}),
		]);
	});
});
