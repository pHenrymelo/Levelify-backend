import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Reward, type RewardProps } from './reward';

export interface QuestRewardProps extends RewardProps {
	questId: UniqueEntityID;
	rewardId: UniqueEntityID;
}

export class QuestReward extends Reward<QuestRewardProps> {
	get questId() {
		return this.props.questId;
	}

	get rewardId() {
		return this.props.rewardId;
	}

	static create(props: QuestRewardProps, id?: UniqueEntityID) {
		const questReward = new Reward(props, id);

		return questReward;
	}
}
