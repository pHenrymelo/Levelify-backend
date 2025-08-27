import type { Goal } from '../../enterprise/entities/goal';

export interface GoalsRepository {
	findById(id: string): Promise<Goal | null>;
	delete(quest: Goal): Promise<void>;
	create(goal: Goal): Promise<void>;
	save(quest: Goal): Promise<void>;
}
