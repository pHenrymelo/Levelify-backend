import { Entity } from '../../core/entities/entity';

interface PlayerProps {
	name: string;
	level: number;
	title: string;
	job: string;
}

export class Player extends Entity<PlayerProps> {}
