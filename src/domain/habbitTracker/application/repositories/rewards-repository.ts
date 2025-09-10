import type { Reward } from '../../enterprise/entities/reward';

export interface RewardsRepository {
	create(reward: Reward): Promise<void>;
}
