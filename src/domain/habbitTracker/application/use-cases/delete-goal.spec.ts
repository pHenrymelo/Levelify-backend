import { MakeGoal } from 'test/factories/make-goal';
import { InMemoryGoalRewardsRepository } from 'test/repositories/in-memory-goal-rewards-repository';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DeleteGoalUseCase } from './delete-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryGoalRewardsRepository: InMemoryGoalRewardsRepository;
let sut: DeleteGoalUseCase;

describe('Delete goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalRewardsRepository = new InMemoryGoalRewardsRepository();
		inMemoryGoalsRepository = new InMemoryGoalsRepository(
			inMemoryGoalRewardsRepository,
		);
		sut = new DeleteGoalUseCase(inMemoryGoalsRepository);
	});

	it('Shoud be able delete a goal', async () => {
		const createdGoal = MakeGoal({}, new UniqueEntityID('goal-to-delete-id'));

		await inMemoryGoalsRepository.create(createdGoal);

		const result = await sut.execute({
			goalId: 'goal-to-delete-id',
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryGoalsRepository.items).toHaveLength(0);
	});
});
