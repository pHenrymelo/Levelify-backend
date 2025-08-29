import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { CreateQuestUseCase } from './create-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: CreateQuestUseCase;

describe('Create quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new CreateQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able create a quest', async () => {
		const result = await sut.execute({
			playerId: 'player-1-teste-id',
			title: 'quest-1 teste',
			description: 'quest description',
		});

		expect(result.isRight()).toEqual(true);
	});
});
