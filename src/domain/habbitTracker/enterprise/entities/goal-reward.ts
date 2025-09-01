import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Reward, type RewardProps } from './reward';

export interface GoalRewardProps extends RewardProps {
	goalId: UniqueEntityID;
	rewardId: UniqueEntityID;
}

export class GoalReward extends Reward<GoalRewardProps> {
	get goalId() {
		return this.props.goalId;
	}

	get rewardId() {
		return this.props.rewardId;
	}

	static create(props: GoalRewardProps, id?: UniqueEntityID) {
		const goalReward = new Reward(props, id);

		return goalReward;
	}
}
