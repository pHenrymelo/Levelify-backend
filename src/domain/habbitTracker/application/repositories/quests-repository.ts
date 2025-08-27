import type { Quest } from '../../enterprise/entities/quest';

export interface QuestsRepository {
	findById(id: string): Promise<Quest | null>;
	create(quest: Quest): Promise<void>;
	findBySlug(slug: string): Promise<Quest | null>;
	delete(quest: Quest): Promise<void>;
}
