import { type Either, right } from '@/core/either';
import { Reward, type rewardTypes } from '../../enterprise/entities/reward';
import type { RewardsRepository } from '../repositories/rewards-repository';

interface CreateRewardUseCaseRereward {
	type: rewardTypes;
	amount: number;
}

type CreateRewardUseCaseResponse = Either<
	null,
	{
		reward: Reward;
	}
>;

export class CreateRewardUseCase {
	constructor(private rewardsRepository: RewardsRepository) {}

	async execute({
		type,
		amount,
	}: CreateRewardUseCaseRereward): Promise<CreateRewardUseCaseResponse> {
		const reward = Reward.create({ type, amount });

		await this.rewardsRepository.create(reward);

		return right({ reward });
	}
}
