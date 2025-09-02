import { type Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { QuestReward } from '../../enterprise/entities/quest-reward';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';

interface GetQuestRewardUseCaseRequest {
	questId: string;
}

type GetQuestRewardUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questReward: QuestReward;
	}
>;

export class GetQuestRewardUseCase {
	constructor(private questRewardsRepository: QuestRewardsRepository) {}

	async execute({
		questId,
	}: GetQuestRewardUseCaseRequest): Promise<GetQuestRewardUseCaseResponse> {
		const questReward =
			await this.questRewardsRepository.findByQuestId(questId);

		if (!questReward) {
			return left(new ResourceNotFoundError());
		}

		return right({ questReward });
	}
}
