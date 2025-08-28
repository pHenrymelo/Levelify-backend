import type { QuestReward } from '../../enterprise/entities/quest-reward';

export interface QuestRewardsRepository {
	create(questReward: QuestReward): Promise<void>;
	delete(questReward: QuestReward): Promise<void>;
	findById(id: string): Promise<QuestReward | null>;
	findByQuestId(questId: string): Promise<QuestReward | null>;
	save(questReward: QuestReward): Promise<void>;
}
