import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Notification,
	type NotificationProps,
} from '@/domain/notification/enterprise/entities/notification';
import { faker } from '@faker-js/faker';

export function MakeNotification(
	overide: Partial<NotificationProps> = {},
	id?: UniqueEntityID,
) {
	const notification = Notification.create(
		{
			recipientId: new UniqueEntityID(),
			title: faker.book.title(),
			content: faker.lorem.sentence(),
			...overide,
		},
		id,
	);

	return notification;
}
