import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { CreateGoalUseCase } from './create-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let sut: CreateGoalUseCase;

describe('Create goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		sut = new CreateGoalUseCase(inMemoryGoalsRepository);
	});

	it('Shoud be able create a goal', async () => {
		const { goal } = await sut.execute({
			questId: 'quest-01-test',
			playerId: 'player-01-test',
			statement: 'goal 1 for quest 1',
		});

		expect(inMemoryGoalsRepository.items[0].id).toEqual(goal.id);
		expect(goal.id).toBeTruthy();
		expect(goal.statement).toEqual('goal 1 for quest 1');
		expect(goal.completed).toEqual(false);
	});
});
