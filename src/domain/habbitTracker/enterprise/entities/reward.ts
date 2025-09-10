import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';

export enum rewardTypes {
	xp = 'XP',
	goal = 'GOLD',
}
export interface RewardProps {
	type: rewardTypes;
	amount: number;
}

export class Reward extends Entity<RewardProps> {
	static create(props: Optional<RewardProps, 'amount'>, id?: UniqueEntityID) {
		const questReward = new Reward(
			{
				...props,
				amount: props.amount ?? 0,
			},
			id,
		);

		return questReward;
	}

	get amount() {
		return this.props.amount;
	}

	get type() {
		return this.props.type;
	}

	set amount(amount: number) {
		this.props.amount = amount;
	}

	set type(type: rewardTypes) {
		this.props.type = type;
	}
}
