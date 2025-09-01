import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CreateGoalUseCase } from './create-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: CreateGoalUseCase;

describe('Create goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		inMemoryGoalsRepository = new InMemoryGoalsRepository(
			inMemoryGoalRewardsRepository,
		);
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new CreateGoalUseCase(
			inMemoryGoalsRepository,
			inMemoryQuestsRepository,
		);
	});

	it('Shoud be able create a goal', async () => {
		await inMemoryQuestsRepository.create(
			MakeQuest(
				{
					playerId: new UniqueEntityID('player-1-test-id'),
				},
				new UniqueEntityID('quest-1-test-id'),
			),
		);

		const result = await sut.execute({
			questId: 'quest-1-test-id',
			statement: 'goal 1 for quest 1',
			rewardIds: ['001', '002'],
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryGoalsRepository.items[0].rewards.currentItems).toHaveLength(
			2,
		);
		expect(inMemoryGoalsRepository.items[0].rewards.currentItems).toEqual([
			expect.objectContaining({
				rewardId: new UniqueEntityID('001'),
			}),
			expect.objectContaining({
				rewardId: new UniqueEntityID('002'),
			}),
		]);
	});
});
