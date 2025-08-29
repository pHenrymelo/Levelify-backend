import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeGoal } from 'test/factories/make-goal';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { SetGoalRewardUseCase } from './set-goal-reward';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let sut: SetGoalRewardUseCase;

describe('Set goal reward use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		sut = new SetGoalRewardUseCase(
			inMemoryGoalsRepository,
			inMemoryGoalRewardsRepository,
		);
	});

	it('Shoud be able create a goal reward', async () => {
		await inMemoryGoalsRepository.create(
			MakeGoal({}, new UniqueEntityID('goal-1-test-id')),
		);

		const result = await sut.execute({
			playerId: 'player-1-test-id',
			goalId: 'goal-1-test-id',
			goldAmount: 100,
			xpAmount: 150,
		});

		expect(result.isRight()).toEqual(true);
	});

	it('Shoud be able create a goal reward whitout xpAmount or goldAmount', async () => {
		await inMemoryGoalsRepository.create(
			MakeGoal({}, new UniqueEntityID('goal-1-teste-id')),
		);

		const result = await sut.execute({
			playerId: 'player-1-teste-id',
			goalId: 'goal-1-teste-id',
		});

		expect(result.isRight()).toEqual(true);
	});
});
