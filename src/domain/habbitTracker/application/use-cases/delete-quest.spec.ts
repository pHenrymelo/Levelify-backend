import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { DeleteQuestUseCase } from './delete-quest';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: DeleteQuestUseCase;

describe('Delete quest use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new DeleteQuestUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able delete a quest', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-delete-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		await sut.execute({
			questId: 'quest-to-delete-id',
			playerId: 'player-test-id',
		});

		expect(inMemoryQuestsRepository.items).toHaveLength(0);
	});

	it('Shoud not be able delete a quest from another user', async () => {
		const createdQuest = MakeQuest(
			{ playerId: new UniqueEntityID('player-test-id') },
			new UniqueEntityID('quest-to-delete-id'),
		);

		await inMemoryQuestsRepository.create(createdQuest);

		expect(async () => {
			await sut.execute({
				questId: 'quest-to-delete-id',
				playerId: 'not-player-test-id',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
