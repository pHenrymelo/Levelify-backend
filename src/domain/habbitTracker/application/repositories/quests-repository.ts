import type { Quest } from '../../enterprise/entities/quest';

export interface QuestsRepository {
	create(quest: Quest): Promise<void>;
	findBySlug(slug: string): Promise<Quest | null>;
}
