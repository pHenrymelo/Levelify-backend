import { MakeQuest } from 'test/factories/make-quest';
import { MakeQuestReward } from 'test/factories/make-quest-reward';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PermissionDeniedError } from '../../../../core/errors/permission-denied-error';
import { DeleteQuestUseCase } from './delete-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: DeleteQuestUseCase;

describe('Delete quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new DeleteQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able delete a quest', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-delete-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		await inMemoryQuestRewardsRepository.create(
			MakeQuestReward({
				questId: createdQuest.id,
				rewardId: new UniqueEntityID('001'),
			}),
		);
		await inMemoryQuestRewardsRepository.create(
			MakeQuestReward({
				questId: createdQuest.id,
				rewardId: new UniqueEntityID('002'),
			}),
		);

		const result = await sut.execute({
			questId: 'quest-to-delete-id',
			playerId: 'player-test-id',
		});

		expect(result.isRight()).toBe(true);
		expect(inMemoryQuestsRepository.items).toHaveLength(0);
		expect(inMemoryQuestRewardsRepository.items).toHaveLength(0);
	});

	it('Shoud not be able delete a quest from another user', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-delete-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const result = await sut.execute({
			questId: 'quest-to-delete-id',
			playerId: 'not-player-test-id',
		});

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(PermissionDeniedError);
		expect(inMemoryQuestsRepository.items).toHaveLength(1);
	});
});
