import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeGoal } from 'test/factories/make-goal';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { CheckGoalUseCase } from './check-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;

let sut: CheckGoalUseCase;

describe('Check goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new CheckGoalUseCase(inMemoryGoalsRepository, inMemoryQuestsRepository);
	});

	it('Shoud be able complete a goal', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-test-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest)

		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id'), completed: false, questId: createdQuest.id },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		await sut.execute({
			playerId: 'player-test-id',
			goalId: 'goal-to-edit-id',
		});

		expect(createdGoal.completed).toEqual(true)
	});

	it('Shoud be able uncomplete a goal', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-test-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest)

		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id'), completed: true, questId: createdQuest.id },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		await sut.execute({
			playerId: 'player-test-id',
			goalId: 'goal-to-edit-id',
		});

		expect(createdGoal.completed).toEqual(false)
	});

	it('Shoud not be able complete a goal from another user', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-test-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest)

		const createdGoal = MakeGoal(
			{ playerId: new UniqueEntityID('player-test-id'), completed: false, questId: createdQuest.id },
			new UniqueEntityID('goal-to-edit-id'),
		);

		await inMemoryGoalsRepository.create(createdGoal);

		expect(async () => {
			await sut.execute({
				playerId: 'not-player-test-id',
				goalId: createdGoal.id.toValue(),
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
