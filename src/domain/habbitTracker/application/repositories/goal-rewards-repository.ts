import type { GoalReward } from '../../enterprise/entities/goal-reward';

export interface GoalRewardsRepository {
  create(goalReward: GoalReward): Promise<void>;
}
