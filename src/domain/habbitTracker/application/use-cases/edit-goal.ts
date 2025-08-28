import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';

interface EditGoalUseCaseRegoal {
	goalId: string;
	statement: string;
}

type EditGoalUseCaseResponse = {
	goal: Goal;
};

export class EditGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		goalId,
		statement,
	}: EditGoalUseCaseRegoal): Promise<EditGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		goal.statement = statement;

		await this.goalsRepository.save(goal);

		return {
			goal,
		};
	}
}
