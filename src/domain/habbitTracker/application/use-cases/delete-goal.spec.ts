import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeGoal } from 'test/factories/make-goal';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { DeleteGoalUseCase } from './delete-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: DeleteGoalUseCase;

describe('Delete quest use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
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
