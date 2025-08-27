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
		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('goal-to-delete-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		await sut.execute({
			goalId: 'goal-to-delete-id',
			playerId: 'player-test-id',
		});

		expect(inMemoryGoalsRepository.items).toHaveLength(0);
	});

	it('Shoud not be able delete a goal from another user', async () => {
		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('goal-to-delete-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		expect(async () => {
			await sut.execute({
				goalId: 'goal-to-delete-id',
				playerId: 'not-player-test-id',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
