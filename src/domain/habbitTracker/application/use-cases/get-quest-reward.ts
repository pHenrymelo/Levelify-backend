import type { QuestReward } from '../../enterprise/entities/quest-reward';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';

interface GetQuestRewardUseCaseRequest {
	questId: string;
}

interface GetQuestRewardUseCaseResponse {
	questReward: QuestReward;
}

export class GetQuestRewardUseCase {
	constructor(private questRewardsRepository: QuestRewardsRepository) {}

	async execute({
		questId,
	}: GetQuestRewardUseCaseRequest): Promise<GetQuestRewardUseCaseResponse> {
		const questReward =
			await this.questRewardsRepository.findByQuestId(questId);

		if (!questReward) {
			throw new Error('Quest not found.');
		}

		return {
			questReward,
		};
	}
}
