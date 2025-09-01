import { MakeGoal } from 'test/factories/make-goal';
import { MakeGoalReward } from 'test/factories/make-goal-reward';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GetGoalRewardUseCase } from './get-goal-reward';

let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: GetGoalRewardUseCase;

describe('Get goal reward by goal id use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		inMemoryGoalsRepository = new InMemoryGoalsRepository(
			inMemoryGoalRewardsRepository,
		);

		sut = new GetGoalRewardUseCase(inMemoryGoalRewardsRepository);
	});

	it('Shoud be able get a goal reward by goal id', async () => {
		await inMemoryGoalsRepository.create(
			MakeGoal({}, new UniqueEntityID('goal-1-teste-id')),
		);

		await inMemoryGoalRewardsRepository.create(
			MakeGoalReward({ goalId: new UniqueEntityID('goal-1-teste-id') }),
		);

		const result = await sut.execute({
			goalId: 'goal-1-teste-id',
		});

		expect(result.isRight()).toEqual(true);
	});
});
