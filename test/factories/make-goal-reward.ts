import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { type GoalRewardProps, GoalReward } from '@/domain/habbitTracker/enterprise/entities/goal-reward';

import { faker } from '@faker-js/faker';

export function MakeGoalReward(
	overide: Partial<GoalRewardProps> = {},
	id?: UniqueEntityID,
) {
	const goalReward = GoalReward.create(
		{
      goalId: new UniqueEntityID(),
      goldAmount: faker.number.int(),
      xpAmount: faker.number.int(),
			...overide,
		},
		id,
	);

	return goalReward;
}
