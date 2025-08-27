import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { EditQuestUseCase } from './edit-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: EditQuestUseCase;

describe('Edit quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new EditQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able edit a quest', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-edit-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		await sut.execute({
			playerId: 'player-test-id',
			questId: 'quest-to-edit-id',
			title: 'Urgent Quest',
			description: 'Let him cook',
			dueDate: newDueDate,
		});

		expect(inMemoryQuestsRepository.items[0]).toMatchObject({
			title: 'Urgent Quest',
			description: 'Let him cook',
			dueDate: newDueDate,
		});
	});

	it('Shoud not be able edit a quest from another user', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-edit-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		const newDueDate = new Date(Date.now() + 3 * 60 * 60 * 1000);

		expect(async () => {
			await sut.execute({
				playerId: 'not-player-test-id',
				questId: createdQuest.id.toValue(),
				title: 'Urgent Quest',
				description: 'Let him cook',
				dueDate: newDueDate,
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
