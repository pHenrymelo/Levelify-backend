import { randomUUID } from 'node:crypto';

interface PlayerProps {
	name: string;
	level: number;
	title: string;
	job: string;
}

export class Player {
	public id: string;
	public name: string;
	public level: number;
	public title: string;
	public job: string;

	constructor(props: PlayerProps, id?: string) {
		this.name = props.name;
		this.level = props.level;
		this.title = props.title;
		this.job = props.job;

		this.id = id ?? randomUUID();
	}
}
