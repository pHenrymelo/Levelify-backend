import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';

interface DeleteQuestRewardUseCaseRequest {
	questRewardId: string;
}

type DeleteQuestRewardUseCaseResponse = {};

export class DeleteQuestRewardUseCase {
	constructor(private questRewardsRepository: QuestRewardsRepository) {}

	async execute({
		questRewardId,
	}: DeleteQuestRewardUseCaseRequest): Promise<DeleteQuestRewardUseCaseResponse> {
		const questReward =
			await this.questRewardsRepository.findById(questRewardId);

		if (!questReward) {
			throw new Error('Quest Reward not found.');
		}

		await this.questRewardsRepository.delete(questReward);

		return {};
	}
}
