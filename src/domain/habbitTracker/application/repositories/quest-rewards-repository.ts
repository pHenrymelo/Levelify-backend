import type { QuestReward } from '../../enterprise/entities/quest-reward';


export interface QuestRewardsRepository {
  create(questReward: QuestReward): Promise<void>;
}
