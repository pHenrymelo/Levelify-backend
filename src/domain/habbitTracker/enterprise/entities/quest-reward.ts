import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import { Reward, type RewardProps } from './reward';

export interface QuestRewardProps extends RewardProps {
	questId: UniqueEntityID;
}

export class QuestReward extends Reward<QuestRewardProps> {
	static create(
		props: Optional<QuestRewardProps, 'xpAmount' | 'goldAmount'>,
		id?: UniqueEntityID,
	) {
		const questReward = new QuestReward(
			{
				...props,
				xpAmount: props.xpAmount ?? 0,
				goldAmount: props.goldAmount ?? 0,
			},
			id,
		);

		return questReward;
	}

	get questId() {
		return this.props.questId;
	}
}
