import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	GoalReward,
	type GoalRewardProps,
} from '@/domain/habbitTracker/enterprise/entities/goal-reward';

export function MakeGoalReward(
	overide: Partial<GoalRewardProps> = {},
	id?: UniqueEntityID,
) {
	const goalReward = GoalReward.create(
		{
			goalId: new UniqueEntityID(),
			rewardId: new UniqueEntityID(),
			...overide,
		},
		id,
	);

	return goalReward;
}
