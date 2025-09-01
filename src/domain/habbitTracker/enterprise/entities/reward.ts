import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export interface RewardProps {
	xpAmount: number;
	goldAmount: number;
}

export class Reward<Props extends RewardProps> extends Entity<Props> {
	static create(
		props: Optional<RewardProps, 'xpAmount' | 'goldAmount'>,
		id?: UniqueEntityID,
	) {
		const questReward = new Reward(
			{
				...props,
				xpAmount: props.xpAmount ?? 0,
				goldAmount: props.goldAmount ?? 0,
			},
			id,
		);

		return questReward;
	}

	get xpAmount() {
		return this.props.xpAmount;
	}

	get goldAmount() {
		return this.props.goldAmount;
	}

	set xpAmount(xpAmount: number) {
		this.props.xpAmount = xpAmount;
	}

	set goldAmount(goldAmount: number) {
		this.props.goldAmount = goldAmount;
	}
}
