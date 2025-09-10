import { MakeGoal } from 'test/factories/make-goal';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { CheckGoalUseCase } from './check-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;

let sut: CheckGoalUseCase;

describe('Check goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryGoalsRepository = new InMemoryGoalsRepository(
			inMemoryGoalRewardsRepository,
		);
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new CheckGoalUseCase(
			inMemoryGoalsRepository,
			inMemoryQuestsRepository,
		);
	});

	it('Shoud be able complete a goal', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-test-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const createdGoal = MakeGoal(
			{ completed: false, questId: createdQuest.id },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		const result = await sut.execute({
			goalId: 'goal-to-edit-id',
		});

		expect(result.isRight()).toEqual(true);
	});

	it('Shoud be able uncomplete a goal', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-test-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const createdGoal = MakeGoal(
			{ completed: true, questId: createdQuest.id },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		const result = await sut.execute({
			goalId: 'goal-to-edit-id',
		});

		expect(result.isRight()).toEqual(true);
	});
});
