import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { Quest } from '../../enterprise/entities/quest';
import { GetQuestBySlugUseCase } from './get-quest-by-slug';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: GetQuestBySlugUseCase;

describe('Get quest by slug use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new GetQuestBySlugUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able get a quest by slug', async () => {
		const createdQuest = Quest.create({
			playerId: new UniqueEntityID('player-1-teste-id'),
			title: 'quest slug test',
			description: 'quest description test',
		});

		await inMemoryQuestsRepository.create(createdQuest);

		const { quest } = await sut.execute({
			slug: 'quest-slug-test',
		});

		expect(quest.id).toBeTruthy();
		expect(quest.description).toEqual('quest description test');
	});
});
