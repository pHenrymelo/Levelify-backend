import { randomUUID } from 'node:crypto';

interface GoalProps {
	statement: string;
	completed: boolean;
	questId: string;
}

export class Goal {
	public id: string;
	public statement: string;
	public completed: boolean;
	public questId: string;

	constructor(props: GoalProps, id?: string) {
		this.statement = props.statement;
		this.completed = props.completed;
		this.questId = props.questId;

		this.id = id ?? randomUUID();
	}
}
