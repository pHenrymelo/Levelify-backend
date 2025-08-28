import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { Goal } from '../../enterprise/entities/goal';

export interface GoalsRepository {
	findById(id: string): Promise<Goal | null>;
	findManyByQuestId(QuestId: string, params: PaginationParams): Promise<Goal[]>;
	delete(quest: Goal): Promise<void>;
	create(goal: Goal): Promise<void>;
	save(quest: Goal): Promise<void>;
}
