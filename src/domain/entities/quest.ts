import { Entity } from '../../core/entities/entity';
import type { UniqueEntityID } from '../../core/entities/unique-entity-id';
import type { Slug } from './value-objects/slug';

interface QuestProps {
	title: string;
	description: string;
	playerId: UniqueEntityID;
	slug: Slug;
	createdAt: Date;
	dueDate: Date;
}

export class Quest extends Entity<QuestProps> {
	private _completed: boolean;

	get title() {
		return this.props.title;
	}

	get description() {
		return this.props.description;
	}

	get completed() {
		return this._completed;
	}

	constructor(props: QuestProps, completed?: boolean, id?: string) {
		super(props, id);

		this._completed = completed ?? false;
	}
}
