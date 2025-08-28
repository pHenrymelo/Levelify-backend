import type { GoalRewardsRepository } from '@/domain/habbitTracker/application/repositories/goal-rewards-repository';
import type { GoalReward } from '@/domain/habbitTracker/enterprise/entities/goal-reward';

export class InMemoryGoalRewardsRepository implements GoalRewardsRepository {
  public items: GoalReward[] = [];

  async create(goalReward: GoalReward) {
    this.items.push(goalReward);
  }

}
