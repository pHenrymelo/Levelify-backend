import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CheckGoalUseCaseRegoal {
	goalId: string;
}

type CheckGoalUseCaseResponse = {
	goal: Goal;
};

export class CheckGoalUseCase {
	constructor(
		private goalsRepository: GoalsRepository,
		private questsRepository: QuestsRepository,
	) {}

	async execute({
		goalId,
	}: CheckGoalUseCaseRegoal): Promise<CheckGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		const quest = await this.questsRepository.findById(goal.questId.toValue());

		if (!quest) {
			throw new Error('Quest not found.');
		}

		goal.completed = !goal.completed;

		await this.goalsRepository.save(goal);

		return {
			goal,
		};
	}
}
