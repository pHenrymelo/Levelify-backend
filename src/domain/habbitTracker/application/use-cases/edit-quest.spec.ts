import { MakeQuest } from 'test/factories/make-quest';
import { MakeQuestReward } from 'test/factories/make-quest-reward';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PermissionDeniedError } from '../../../../core/errors/permission-denied-error';
import { EditQuestUseCase } from './edit-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: EditQuestUseCase;

describe('Edit quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new EditQuestUseCase(
			inMemoryQuestsRepository,
			inMemoryQuestRewardsRepository,
		);
	});

	it('Shoud be able edit a quest', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-edit-id'),
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

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		const result = await sut.execute({
			playerId: 'player-test-id',
			questId: 'quest-to-edit-id',
			title: 'Urgent Quest',
			description: 'Let him cook',
			dueDate: newDueDate,
			rewardIds: ['001', '003'],
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryQuestsRepository.items[0]).toMatchObject({
			title: 'Urgent Quest',
			description: 'Let him cook',
			dueDate: newDueDate,
		});
		expect(inMemoryQuestsRepository.items[0].rewards.currentItems).toHaveLength(
			2,
		);
		expect(inMemoryQuestsRepository.items[0].rewards.currentItems).toEqual([
			expect.objectContaining({
				rewardId: new UniqueEntityID('001'),
			}),
			expect.objectContaining({
				rewardId: new UniqueEntityID('003'),
			}),
		]);
	});

	it('Shoud not be able edit a quest from another user', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-edit-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		const result = await sut.execute({
			playerId: 'not-player-test-id',
			questId: createdQuest.id.toValue(),
			title: 'Urgent Quest',
			description: 'Let him cook',
			dueDate: newDueDate,
			rewardIds: [],
		});

		expect(result.isLeft()).toEqual(true);
		expect(result.value).toBeInstanceOf(PermissionDeniedError);
	});
});
