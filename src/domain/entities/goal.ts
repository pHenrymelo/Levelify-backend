import { Entity } from '../../core/entities/entity';
import type { UniqueEntityID } from '../../core/entities/unique-entity-id';
import type { Optional } from '../../core/types/optional';

interface GoalProps {
	statement: string;
	questId: UniqueEntityID;
	completed: boolean;
}

export class Goal extends Entity<GoalProps> {
	static create(props: Optional<GoalProps, 'completed'>, id?: UniqueEntityID) {
		const goal = new Goal(
			{
				...props,
				completed: false,
			},
			id,
		);

		return goal;
	}

	public get statement() {
		return this.props.statement;
	}

	public get questId() {
		return this.props.questId;
	}

	public get completed() {
		return this.props.completed;
	}
}
