import { InMemoryRewardsRepository } from 'test/repositories/in-memory-rewards-repository';
import { rewardTypes } from '../../enterprise/entities/reward';
import { CreateRewardUseCase } from './create-reward';

let inMemoryRewardRepository: InMemoryRewardsRepository;
let sut: CreateRewardUseCase;

describe('Create quest reward use case tests', () => {
	beforeEach(() => {
		inMemoryRewardRepository = new InMemoryRewardsRepository();
		sut = new CreateRewardUseCase(inMemoryRewardRepository);
	});

	it('Shoud be able create a quest reward', async () => {
		const result = await sut.execute({
			type: rewardTypes.xp,
			amount: 100,
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryRewardRepository.items[0]).toEqual(result.value?.reward);
	});
});
