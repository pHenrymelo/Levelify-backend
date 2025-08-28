import type { QuestRewardsRepository } from '@/domain/habbitTracker/application/repositories/quest-rewards-repository';
import type { QuestReward } from '@/domain/habbitTracker/enterprise/entities/quest-reward';

export class InMemoryQuestRewardsRepository implements QuestRewardsRepository {
  public items: QuestReward[] = [];

  async create(questReward: QuestReward) {
    this.items.push(questReward);
  }

}
