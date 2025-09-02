import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { SendNotificationUseCase } from './send-notification';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: SendNotificationUseCase;

describe('Send notification use case tests', () => {
	beforeEach(() => {
		inMemoryNotificationRepository = new InMemoryNotificationRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationRepository);
	});

	it('Shoud be able to send a notification', async () => {
		const result = await sut.execute({
			recipientId: new UniqueEntityID('test-id'),
			title: 'notification title',
			content: 'notification content',
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryNotificationRepository.items[0]).toEqual(
			result.value?.notification,
		);
	});
});
