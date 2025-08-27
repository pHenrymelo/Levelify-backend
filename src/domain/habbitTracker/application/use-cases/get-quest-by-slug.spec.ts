import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestBySlugUseCase } from './get-quest-by-slug';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let sut: GetQuestBySlugUseCase;

describe('Get quest by slug use case tests', () => {
	beforeEach(() => {
		inMemoryQuestsRepository = new InMemoryQuestsRepository();
		sut = new GetQuestBySlugUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able get a quest by slug', async () => {
		const createdQuest = MakeQuest({
			slug: Slug.create('quest-slug-test'),
		});

		await inMemoryQuestsRepository.create(createdQuest);

		const { quest } = await sut.execute({
			slug: 'quest-slug-test',
		});

		expect(quest.id).toBeTruthy();
	});
});
