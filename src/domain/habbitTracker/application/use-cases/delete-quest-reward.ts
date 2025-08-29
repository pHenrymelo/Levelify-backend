import { type Either, left, right } from '@/core/either';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteQuestRewardUseCaseRequest {
	questRewardId: string;
}

type DeleteQuestRewardUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteQuestRewardUseCase {
	constructor(private questRewardsRepository: QuestRewardsRepository) {}

	async execute({
		questRewardId,
	}: DeleteQuestRewardUseCaseRequest): Promise<DeleteQuestRewardUseCaseResponse> {
		const questReward =
			await this.questRewardsRepository.findById(questRewardId);

		if (!questReward) {
			return left(new ResourceNotFoundError());
		}

		await this.questRewardsRepository.delete(questReward);

		return right({});
	}
}
