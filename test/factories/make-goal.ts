import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Goal,
	type GoalProps,
} from '@/domain/habbitTracker/enterprise/entities/goal';
import { faker } from '@faker-js/faker';

export function MakeGoal(
	overide: Partial<GoalProps> = {},
	id?: UniqueEntityID,
) {
	const goal = Goal.create(
		{
			questId: new UniqueEntityID(),
			statement: faker.book.title(),
			...overide,
		},
		id,
	);

	return goal;
}
