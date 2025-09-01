import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestBySlugUseCase } from './get-quest-by-slug';

let inMemoryQuestsRepository: InMemoryQuestsRepository;
let inMemoryQuestRewardsRepository: InMemoryQuestRewardsRepository;
let sut: GetQuestBySlugUseCase;

describe('Get quest by slug use case tests', () => {
	beforeEach(() => {
		inMemoryQuestRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestRewardsRepository,
		);
		sut = new GetQuestBySlugUseCase(inMemoryQuestsRepository);
	});

	it('Shoud be able get a quest by slug', async () => {
		const createdQuest = MakeQuest({
			slug: Slug.create('quest-slug-test'),
		});

		await inMemoryQuestsRepository.create(createdQuest);

		const result = await sut.execute({
			slug: 'quest-slug-test',
		});

		expect(result.isRight()).toEqual(true);
	});
});
