import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface QuestRewardProps {
	questId: UniqueEntityID;
	rewardId: UniqueEntityID;
}

export class QuestReward extends Entity<QuestRewardProps> {
	get questId() {
		return this.props.questId;
	}

	get rewardId() {
		return this.props.rewardId;
	}

	static create(props: QuestRewardProps, id?: UniqueEntityID) {
		const questReward = new QuestReward(props, id);

		return questReward;
	}
}
