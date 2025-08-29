import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { SetQuestRewardUseCase } from './set-quest-reward';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: SetQuestRewardUseCase;

describe('Set quest reward use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		sut = new SetQuestRewardUseCase(
			inMemoryQuestsRepository,
			inMemoryQuestRewardsRepository,
		);
	});

	it('Shoud be able create a quest reward', async () => {
		await inMemoryQuestsRepository.create(
			MakeQuest(
				{
					playerId: new UniqueEntityID('player-1-test-id'),
				},
				new UniqueEntityID('quest-1-test-id'),
			),
		);

		const result = await sut.execute({
			playerId: 'player-1-test-id',
			questId: 'quest-1-test-id',
			goldAmount: 100,
			xpAmount: 150,
		});

		expect(result.isRight()).toEqual(true);
	});

	it('Shoud be able create a quest reward whitout xpAmount or goldAmount', async () => {
		await inMemoryQuestsRepository.create(
			MakeQuest(
				{
					playerId: new UniqueEntityID('player-1-teste-id'),
				},
				new UniqueEntityID('quest-1-teste-id'),
			),
		);

		const result = await sut.execute({
			playerId: 'player-1-teste-id',
			questId: 'quest-1-teste-id',
		});

		expect(result.isRight()).toEqual(true);
	});
});
