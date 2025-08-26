import type { QuestsRepository } from '@/domain/habbitTracker/application/repositories/quests-repository';
import type { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';

export class InMemoryQuestsRepository implements QuestsRepository {
	public items: Quest[] = [];

	async create(quest: Quest) {
		this.items.push(quest);
	}
}
