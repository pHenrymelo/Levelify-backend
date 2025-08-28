import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { Quest } from '../../enterprise/entities/quest';

export interface QuestsRepository {
	findById(id: string): Promise<Quest | null>;
	findBySlug(slug: string): Promise<Quest | null>;
	findManyPriority(params: PaginationParams): Promise<Quest[]>;
	create(quest: Quest): Promise<void>;
	delete(quest: Quest): Promise<void>;
	save(quest: Quest): Promise<void>;
}
