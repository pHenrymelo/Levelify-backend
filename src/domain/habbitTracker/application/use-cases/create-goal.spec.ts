import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryGoalsRepository } from 'test/repositories/in-memory-goals-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { CreateGoalUseCase } from './create-goal';

let inMemoryGoalsRepository: InMemoryGoalsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: CreateGoalUseCase;

describe('Create goal use case tests', () => {
	beforeEach(() => {
		inMemoryGoalsRepository = new InMemoryGoalsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new CreateGoalUseCase(inMemoryGoalsRepository, inMemoryQuestsRepository);
	});

	it('Shoud be able create a goal', async () => {
		
		await inMemoryQuestsRepository.create(MakeQuest({
				playerId: new UniqueEntityID('player-1-test-id'),
			}, new UniqueEntityID('quest-1-test-id')));

		const { goal } = await sut.execute({
			questId: 'quest-1-test-id',
			statement: 'goal 1 for quest 1',
		});

		expect(inMemoryGoalsRepository.items[0].id).toEqual(goal.id);
		expect(goal.id).toBeTruthy();
		expect(goal.statement).toEqual('goal 1 for quest 1');
		expect(goal.completed).toEqual(false);
	});
});
