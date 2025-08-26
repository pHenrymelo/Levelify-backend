import type { Goal } from '../../enterprise/entities/goal';

export interface GoalsRepository {
	create(goal: Goal): Promise<void>;
}
