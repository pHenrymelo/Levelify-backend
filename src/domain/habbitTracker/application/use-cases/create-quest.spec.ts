import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import type { QuestsRepository } from '../repositories/quests-repository';
import { CreateQuestUseCase } from './create-quest';

let inMemoryQuestsRepository: QuestsRepository;
let sut: CreateQuestUseCase;

describe('Create quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new CreateQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able create a quest', async () => {
		const { quest } = await sut.execute({
			playerId: 'player-1-teste-id',
			title: 'quest-1 teste',
			description: 'quest description',
		});

		expect(quest.id).toBeTruthy();
		expect(quest.title).toEqual('quest-1 teste');
		expect(quest.description).toEqual('quest description');
		expect(quest.completed).toEqual(false);
	});
});
