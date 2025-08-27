import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Quest,
	type QuestProps,
} from '@/domain/habbitTracker/enterprise/entities/quest';
import { faker } from '@faker-js/faker';

export function MakeQuest(
	overide: Partial<QuestProps> = {},
	id?: UniqueEntityID,
) {
	const quest = Quest.create(
		{
			playerId: new UniqueEntityID(),
			title: faker.book.title(),
			description: faker.lorem.paragraph(),
			...overide,
		},
		id,
	);

	return quest;
}
