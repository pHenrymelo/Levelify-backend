import type { GoalsRepository } from '@/domain/habbitTracker/application/repositories/goals-repository';
import type { Goal } from '@/domain/habbitTracker/enterprise/entities/goal';

export class InMemoryGoalsRepository implements GoalsRepository {
	public items: Goal[] = [];

	async create(goal: Goal) {
		this.items.push(goal);
	}
}
