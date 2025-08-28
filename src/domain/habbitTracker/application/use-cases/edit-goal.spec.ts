import { MakeGoal } from 'test/factories/make-goal';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { EditGoalUseCase } from './edit-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: EditGoalUseCase;

describe('Edit goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		sut = new EditGoalUseCase(inMemoryGoalsRepository);
	});

	it('Shoud be able edit a goal', async () => {
		const createdGoal = MakeGoal({}, new UniqueEntityID('goal-to-edit-id'));

		await inMemoryGoalsRepository.create(createdGoal);

		await sut.execute({
			goalId: 'goal-to-edit-id',
			statement: 'Urgent Goal',
		});

		expect(inMemoryGoalsRepository.items[0]).toMatchObject({
			statement: 'Urgent Goal',
		});
	});
});
