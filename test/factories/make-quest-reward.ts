import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	QuestReward,
	type QuestRewardProps,
} from '@/domain/habbitTracker/enterprise/entities/quest-reward';

export function MakeQuestReward(
	overide: Partial<QuestRewardProps> = {},
	id?: UniqueEntityID,
) {
	const questReward = QuestReward.create(
		{
			questId: new UniqueEntityID(),
			rewardId: new UniqueEntityID(),
			...overide,
		},
		id,
	);

	return questReward;
}
