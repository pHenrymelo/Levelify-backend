import { MakeQuestReward } from 'test/factories/make-quest-reward';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteQuestRewardUseCase } from './delete-quest-reward';

let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: DeleteQuestRewardUseCase;

describe('Delete quest reward use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		sut = new DeleteQuestRewardUseCase(inMemoryQuestRewardsRepository);
	});

	it('Shoud be able delete a quest reward', async () => {
		await inMemoryQuestRewardsRepository.create(
			MakeQuestReward({}, new UniqueEntityID('quest-reward-to-delete-id')),
		);

		const result = await sut.execute({
			questRewardId: 'quest-reward-to-delete-id',
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryQuestRewardsRepository.items).toHaveLength(0);
	});
});
