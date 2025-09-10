import { type Either, left, right } from '@/core/either';
import { PermissionDeniedError } from '@/core/errors/permission-denied-error';
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error';
import type { NotificationsRepository } from '../repositories/notifications-repository';

interface ReadNotificationUseCaseRenotification {
	notificationId: string;
	recipientId: string;
}

type ReadNotificationUseCaseResponse = Either<
	ResourceNotFoundError | PermissionDeniedError,
	{}
>;

export class ReadNotificationUseCase {
	constructor(private notificationsRepository: NotificationsRepository) {}

	async execute({
		notificationId,
		recipientId,
	}: ReadNotificationUseCaseRenotification): Promise<ReadNotificationUseCaseResponse> {
		const notification =
			await this.notificationsRepository.findById(notificationId);

		if (!notification) {
			return left(new ResourceNotFoundError());
		}

		if (recipientId !== notification.recipientId.toString()) {
			return left(new PermissionDeniedError());
		}

		notification.read();
		await this.notificationsRepository.save(notification);

		return right({});
	}
}
