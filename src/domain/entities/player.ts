import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface PlayerProps {
	name: string;
	level: number;
	title?: string;
	job?: string;
}

export class Player extends Entity<PlayerProps> {
	static create(props: PlayerProps, id: UniqueEntityID) {
		const player = new Player(
			{
				...props,
				title: 'none',
				job: 'none',
			},
			id,
		);

		return player;
	}

	public get name() {
		return this.props.name;
	}

	public get level() {
		return this.props.level;
	}

	public get title() {
		return this.props.title;
	}

	public get job() {
		return this.props.job;
	}
}
