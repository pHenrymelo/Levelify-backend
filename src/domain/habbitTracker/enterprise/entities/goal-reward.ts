import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import { Reward, type RewardProps } from './reward';

export interface GoalRewardProps extends RewardProps {
	goalId: UniqueEntityID;
}

export class GoalReward extends Reward<GoalRewardProps> {
	static create(
		props: Optional<GoalRewardProps, 'xpAmount' | 'goldAmount'>,
		id?: UniqueEntityID,
	) {
		const goalReward = new GoalReward(
			{
				...props,
				xpAmount: props.xpAmount ?? 0,
				goldAmount: props.goldAmount ?? 0,
			},
			id,
		);

		return goalReward;
	}

	get goalId() {
		return this.props.goalId;
	}
}
