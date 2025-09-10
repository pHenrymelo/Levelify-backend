import { DomainEvents } from '@/core/events/domain-events';
import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { QuestRewardsRepository } from '@/domain/habbitTracker/application/repositories/quest-rewards-repository';
import type { QuestsRepository } from '@/domain/habbitTracker/application/repositories/quests-repository';
import type { Quest } from '@/domain/habbitTracker/enterprise/entities/quest';

export class InMemoryQuestsRepository implements QuestsRepository {
	public items: Quest[] = [];

	constructor(private questRewardsRepository: QuestRewardsRepository) {}

	async create(quest: Quest) {
		this.items.push(quest);
		DomainEvents.dispatchEventsForAggregate(quest.id);
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

		this.questRewardsRepository.deleteManyByQuestId(quest.id.toString());
	}

	async save(quest: Quest) {
		const itemIndex = this.items.findIndex((item) => item.id === quest.id);

		this.items[itemIndex] = quest;
		DomainEvents.dispatchEventsForAggregate(quest.id);
	}

	async findManyPriority({ page }: PaginationParams) {
		const quests = this.items
			.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
			.slice((page - 1) * 20, page * 20);

		return quests;
	}
}
