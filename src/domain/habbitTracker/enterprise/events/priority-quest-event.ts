import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { DomainEvent } from '@/core/events/domain-event';
import type { Quest } from '../entities/quest';

export class PriorityQuestEvent implements DomainEvent {
	public ocurredAt: Date;
	public quest: Quest;

	constructor(quest: Quest) {
		this.quest = quest;
		this.ocurredAt = new Date();
	}

	getAggregateId(): UniqueEntityID {
		return this.quest.id;
	}
}
