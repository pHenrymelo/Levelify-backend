import { DomainEvents } from '@/core/events/domain-events';
import type { EventHandler } from '@/core/events/event-handler';
import { PriorityQuestEvent } from '@/domain/habbitTracker/enterprise/events/priority-quest-event';
import type { SendNotificationUseCase } from '../use-cases/send-notification';

export class OnPriorityQuest implements EventHandler {
	constructor(private sendNotification: SendNotificationUseCase) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendPriorityNotification.bind(this),
			PriorityQuestEvent.name,
		);
	}

	private async sendPriorityNotification({ quest }: PriorityQuestEvent) {
		if (quest) {
			await this.sendNotification.execute({
				recipientId: quest.playerId.toString(),
				title: `Uma nova missão urgente apareceu!`,
				content: `Resta menos de um dia para concluir a missão ${quest.title}`,
			});
		}
	}
}
