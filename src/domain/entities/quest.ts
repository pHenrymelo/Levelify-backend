import { randomUUID } from 'node:crypto';

interface QuestProps {
	title: string;
	description: string;
	playerId: string;
}

export class Quest {
	public id: string;
	public title: string;
	public description: string;
	public completed: boolean;
	public playerId: string;

	constructor(props: QuestProps, completed?: boolean, id?: string) {
		this.title = props.title;
		this.description = props.description;
		this.playerId = props.playerId;

		this.completed = completed ?? false;
		this.id = id ?? randomUUID();
	}
}
