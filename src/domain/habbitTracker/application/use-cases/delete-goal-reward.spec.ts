import { MakeGoalReward } from 'test/factories/make-goal-reward';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteGoalRewardUseCase } from './delete-goal-reward';

let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let sut: DeleteGoalRewardUseCase;

describe('Delete goal reward use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		sut = new DeleteGoalRewardUseCase(inMemoryGoalRewardsRepository);
	});

	it('Shoud be able delete a goal reward', async () => {
		await inMemoryGoalRewardsRepository.create(
			MakeGoalReward({}, new UniqueEntityID('goal-reward-to-delete-id')),
		);

		const result = await sut.execute({
			goalRewardId: 'goal-reward-to-delete-id',
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryGoalRewardsRepository.items).toHaveLength(0);
	});
});
