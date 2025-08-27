import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeGoal } from 'test/factories/make-goal';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { EditGoalUseCase } from './edit-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: EditGoalUseCase;

describe('Edit goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		sut = new EditGoalUseCase(inMemoryGoalsRepository);
	});

	it('Shoud be able edit a goal', async () => {
		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		await sut.execute({
			playerId: 'player-test-id',
			goalId: 'goal-to-edit-id',
			statement: 'Urgent Goal',
		});

		expect(inMemoryGoalsRepository.items[0]).toMatchObject({
			statement: 'Urgent Goal',
		});
	});

	it('Shoud not be able edit a goal from another user', async () => {
		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		expect(async () => {
			await sut.execute({
				playerId: 'not-player-test-id',
				goalId: createdGoal.id.toValue(),
				statement: 'Urgent Goal',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
