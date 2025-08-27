import type { GoalsRepository } from '@/domain/habbitTracker/application/repositories/goals-repository';
import type { Goal } from '@/domain/habbitTracker/enterprise/entities/goal';

export class InMemoryGoalsRepository implements GoalsRepository {
	public items: Goal[] = [];

	async create(goal: Goal) {
		this.items.push(goal);
	}

	async findById(id: string) {
		const goal = this.items.find((item) => item.id.toString() === id);

		if (!goal) {
			return null;
		}

		return goal;
	}

	async delete(goal: Goal) {
		const itemIndex = this.items.findIndex((item) => item.id === goal.id);

		this.items.splice(itemIndex, 1);
	}
}
