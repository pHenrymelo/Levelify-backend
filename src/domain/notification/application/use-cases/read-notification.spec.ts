import { MakeNotification } from 'test/factories/make-notification';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PermissionDeniedError } from '@/core/errors/permission-denied-error';
import { ReadNotificationUseCase } from './read-notification';

let inMemoryNotificationRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe('Read notification use case tests', () => {
	beforeEach(() => {
		inMemoryNotificationRepository = new InMemoryNotificationRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
	});

	it('Shoud be able to read a notification', async () => {
		const createdNotification = MakeNotification(
			{ recipientId: new UniqueEntityID('user-test-id') },
			new UniqueEntityID('notification-test-id'),
		);

		await inMemoryNotificationRepository.create(createdNotification);

		const result = await sut.execute({
			notificationId: createdNotification.id.toString(),
			recipientId: createdNotification.recipientId.toString(),
		});

		expect(result.isRight()).toEqual(true);
		expect(inMemoryNotificationRepository.items[0].readAt).toEqual(
			expect.any(Date),
		);
	});

	it('Shoud not be able to read a notification from another user', async () => {
		const createdNotification = MakeNotification(
			{ recipientId: new UniqueEntityID('user-test-id') },
			new UniqueEntityID('notification-test-id'),
		);

		await inMemoryNotificationRepository.create(createdNotification);

		const result = await sut.execute({
			notificationId: createdNotification.id.toString(),
			recipientId: 'another-user-id',
		});

		expect(result.isLeft()).toEqual(true);
		expect(result.value).toBeInstanceOf(PermissionDeniedError);
	});
});
