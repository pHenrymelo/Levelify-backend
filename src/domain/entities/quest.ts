import { Entity } from '../../core/entities/entity';
import type { UniqueEntityID } from '../../core/entities/unique-entity-id';
import type { Optional } from '../../core/types/optional';
import type { Slug } from './value-objects/slug';

interface QuestProps {
	title: string;
	description: string;
	playerId: UniqueEntityID;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
	dueDate?: Date;
	completed?: boolean;
}

const twentyfourHoursInMiliseconds = 24 * 60 * 60 * 1000;
export class Quest extends Entity<QuestProps> {
	static create(props: Optional<QuestProps, 'createdAt'>, id?: UniqueEntityID) {
		const quest = new Quest(
			{
				...props,
				completed: false,
				createdAt: new Date(),
				dueDate:
					props.dueDate ?? new Date(Date.now() + twentyfourHoursInMiliseconds),
			},
			id,
		);

		return quest;
	}

	public get title() {
		return this.props.title;
	}

	public get description() {
		return this.props.description;
	}

	public get completed() {
		return this.props.completed;
	}
}
