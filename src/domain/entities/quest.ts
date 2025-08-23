import { randomUUID } from 'node:crypto';
import type { Slug } from './value-objects/slug';

interface QuestProps {
	title: string;
	description: string;
	playerId: string;
	slug: Slug;
}

export class Quest {
	public id: string;
	public title: string;
	public description: string;
	public slug: Slug;
	public completed: boolean;
	public playerId: string;

	constructor(props: QuestProps, completed?: boolean, id?: string) {
		this.title = props.title;
		this.description = props.description;
		this.playerId = props.playerId;
		this.slug = props.slug;

		this.completed = completed ?? false;
		this.id = id ?? randomUUID();
	}
}
