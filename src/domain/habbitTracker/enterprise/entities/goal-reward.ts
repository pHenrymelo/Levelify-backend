import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

export interface GoalRewardProps {
	goalId: UniqueEntityID;
	rewardId: UniqueEntityID;
}

export class GoalReward extends Entity<GoalRewardProps> {
	get goalId() {
		return this.props.goalId;
	}

	get rewardId() {
		return this.props.rewardId;
	}

	static create(props: GoalRewardProps, id?: UniqueEntityID) {
		const goalReward = new GoalReward(props, id);

		return goalReward;
	}
}
