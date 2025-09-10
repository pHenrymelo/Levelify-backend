import { MakeQuest } from 'test/factories/make-quest';
import { MakeQuestReward } from 'test/factories/make-quest-reward';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GetQuestRewardUseCase } from './get-quest-reward';

let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: GetQuestRewardUseCase;

describe('Get quest reward by quest id use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);

		sut = new GetQuestRewardUseCase(inMemoryQuestRewardsRepository);
	});

	it('Shoud be able get a quest reward by quest id', async () => {
		await inMemoryQuestsRepository.create(
			MakeQuest(
				{
					playerId: new UniqueEntityID('player-1-teste-id'),
				},
				new UniqueEntityID('quest-1-teste-id'),
			),
		);

		await inMemoryQuestRewardsRepository.create(
			MakeQuestReward({ questId: new UniqueEntityID('quest-1-teste-id') }),
		);

		const result = await sut.execute({
			questId: 'quest-1-teste-id',
		});

		expect(result.isRight()).toEqual(true);
	});
});
