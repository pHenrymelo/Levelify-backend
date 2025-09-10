import type { PaginationParams } from '@/core/repositories/pagination-params';
import type { GoalRewardsRepository } from '@/domain/habbitTracker/application/repositories/goal-rewards-repository';
import type { GoalsRepository } from '@/domain/habbitTracker/application/repositories/goals-repository';
import type { Goal } from '@/domain/habbitTracker/enterprise/entities/goal';

export class InMemoryGoalsRepository implements GoalsRepository {
	public items: Goal[] = [];

	constructor(private goalRewardsRepository: GoalRewardsRepository) {}

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

		this.goalRewardsRepository.deleteManyByGoalId(goal.id.toString());
	}

	async save(goal: Goal) {
		const itemIndex = this.items.findIndex((item) => item.id === goal.id);

		this.items[itemIndex] = goal;
	}

	async findManyByQuestId(QuestId: string, { page }: PaginationParams) {
		const goals = this.items
			.filter((item) => item.questId.toString() === QuestId)
			.slice((page - 1) * 20, page * 20);

		return goals;
	}
}
