import { Entity } from '../../core/entities/entity';
import type { UniqueEntityID } from '../../core/entities/unique-entity-id';

interface GoalProps {
	statement: string;
	questId: UniqueEntityID;
}

export class Goal extends Entity<GoalProps> {
	private _completed: boolean;

	get completed() {
		return this._completed;
	}

	constructor(props: GoalProps, completed?: boolean, id?: string) {
		super(props, id);
		this._completed = completed ?? false;
	}
}
