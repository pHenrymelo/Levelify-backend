import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';

interface EditGoalUseCaseRegoal {
	playerId: string;
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
		playerId,
		statement,
	}: EditGoalUseCaseRegoal): Promise<EditGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		if (playerId !== goal.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		goal.statement = statement;

		await this.goalsRepository.save(goal);

		return {
			goal,
		};
	}
}
