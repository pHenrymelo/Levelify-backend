import type { Quest } from '../entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';
import { CreateQuestUseCase } from './create-quest';

const fakeQuestsRepository: QuestsRepository = {
	create: async (quest: Quest): Promise<void> => {
		return;
	},
};

describe('Create quest use case tests', () => {
	it('Shoud be able create a new quest', async () => {
		const createQuest = new CreateQuestUseCase(fakeQuestsRepository);

		const quest = await createQuest.execute({
			playerId: 'player-1-teste-id',
			title: 'quest-1 teste',
			description: 'quest description',
		});

		expect(quest.completed).toEqual(false);
		expect(quest.title).toEqual('quest-1 teste');
		expect(quest.description).toEqual('quest description');
	});
});
