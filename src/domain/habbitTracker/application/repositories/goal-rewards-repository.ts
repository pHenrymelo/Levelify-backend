import type { GoalReward } from '../../enterprise/entities/goal-reward';

export interface GoalRewardsRepository {
	findManyByGoalId(goalId: string): Promise<GoalReward[]>;
	deleteManyByGoalId(goalId: string): Promise<void>;

	create(goalReward: GoalReward): Promise<void>;
	delete(goalReward: GoalReward): Promise<void>;
	findById(id: string): Promise<GoalReward | null>;
	findByGoalId(goalId: string): Promise<GoalReward | null>;
	save(goalReward: GoalReward): Promise<void>;
}
