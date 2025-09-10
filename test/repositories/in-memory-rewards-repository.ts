import type { RewardsRepository } from '@/domain/habbitTracker/application/repositories/rewards-repository';
import type { Reward } from '@/domain/habbitTracker/enterprise/entities/reward';

export class InMemoryRewardsRepository implements RewardsRepository {
	public items: Reward[] = [];

	async create(reward: Reward) {
		this.items.push(reward);
	}
}
