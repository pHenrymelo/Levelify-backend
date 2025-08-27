import type { QuestsRepository } from '@/domain/habbitTracker/application/repositories/quests-repository';
import type { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';

export class InMemoryQuestsRepository implements QuestsRepository {
	public items: Quest[] = [];

	async create(quest: Quest) {
		this.items.push(quest);
	}

	async findBySlug(slug: string) {
		const quest = this.items.find((item) => item.slug.value === slug);

		if (!quest) {
			return null;
		}

		return quest;
	}

	async findById(id: string) {
		const quest = this.items.find((item) => item.id.toString() === id);

		if (!quest) {
			return null;
		}

		return quest;
	}

	async delete(quest: Quest) {
		const itemIndex = this.items.findIndex((item) => item.id === quest.id);

		this.items.splice(itemIndex, 1);
	}
}
