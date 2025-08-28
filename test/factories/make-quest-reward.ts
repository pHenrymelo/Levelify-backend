import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { type QuestRewardProps, QuestReward } from '@/domain/habbitTracker/enterprise/entities/quest-reward';

import { faker } from '@faker-js/faker';

export function MakeQuestReward(
	overide: Partial<QuestRewardProps> = {},
	id?: UniqueEntityID,
) {
	const questReward = QuestReward.create(
		{
      questId: new UniqueEntityID(),
      goldAmount: faker.number.int(),
      xpAmount: faker.number.int(),
			...overide,
		},
		id,
	);

	return questReward;
}
