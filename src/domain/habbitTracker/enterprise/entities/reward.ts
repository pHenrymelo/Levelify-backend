import { Entity } from '@/core/entities/entity';

export interface RewardProps {
	xpAmount: number;
	goldAmount: number;
}

export abstract class Reward<Props extends RewardProps> extends Entity<Props> {
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
