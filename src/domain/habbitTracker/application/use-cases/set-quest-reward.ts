import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestReward } from '../../enterprise/entities/quest-reward';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface SetQuestRewardUseCaseRequest {
	questId: string;
	playerId: string;
	xpAmount?: number;
	goldAmount?: number;
}

interface SetQuestRewardUseCaseResponse {
	questReward: QuestReward;
}

export class SetQuestRewardUseCase {
	constructor(
		private questsRepository: QuestsRepository,
		private questRewardsRepository: QuestRewardsRepository,
	) {}

	async execute({
		playerId,
		questId,
		goldAmount,
		xpAmount,
	}: SetQuestRewardUseCaseRequest): Promise<SetQuestRewardUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			throw new Error('Quest not found.');
		}

		if (playerId !== quest.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		const questReward = QuestReward.create({
			questId: new UniqueEntityID(questId),
			xpAmount,
			goldAmount,
		});

		await this.questRewardsRepository.create(questReward);

		return {
			questReward,
		};
	}
}
