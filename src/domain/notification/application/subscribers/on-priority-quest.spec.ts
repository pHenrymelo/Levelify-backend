import { MakeQuest } from 'test/factories/make-quest';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository';
import { InMemoryQuestRewardsRepository } from 'test/repositories/in-memory-quest-rewards-repository';
import { InMemoryQuestsRepository } from 'test/repositories/in-memory-quests-repository';
import { waitFor } from 'test/utils/wait-for';
import type { MockInstance } from 'vitest';
import { SendNotificationUseCase } from '../use-cases/send-notification';
import { OnPriorityQuest } from './on-priority-quest';

let inMemoryQuestsRewardsRepository: InMemoryQuestRewardsRepository;
let inMemoryQuestsRepository: InMemoryQuestsRepository;

let sendNotificationUseCase: SendNotificationUseCase;
let inMemoryNotificationsRepository: InMemoryNotificationRepository;

let sendNotificationSpy: MockInstance;

describe('On priority quest', () => {
	beforeEach(() => {
		inMemoryQuestsRewardsRepository = new InMemoryQuestRewardsRepository();
		inMemoryQuestsRepository = new InMemoryQuestsRepository(
			inMemoryQuestsRewardsRepository,
		);
		inMemoryNotificationsRepository = new InMemoryNotificationRepository();
		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationsRepository,
		);

		sendNotificationSpy = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnPriorityQuest(sendNotificationUseCase);
	});

	it('shoud send a notification when an quest is prioritary', async () => {
		const futureDate = new Date();
		futureDate.setHours(futureDate.getHours() + 6);
		const quest = MakeQuest({ dueDate: futureDate });
		inMemoryQuestsRepository.create(quest);

		await waitFor(() => {
			expect(sendNotificationSpy).toHaveBeenCalled();
		});
	});
});
