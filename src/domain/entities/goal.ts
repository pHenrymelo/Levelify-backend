import { Entity } from '../../core/entities/entity';
import type { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface GoalProps {
	statement: string;
	questId: UniqueEntityID;
	completed?: boolean;
}

export class Goal extends Entity<GoalProps> {
	static create(props: GoalProps, id?: UniqueEntityID) {
		const goal = new Goal(
			{
				...props,
				completed: false,
			},
			id,
		);

		return goal;
	}
}
