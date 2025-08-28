import type { GoalsRepository } from '../repositories/goals-repository';

interface DeleteGoalUseCaseRequest {
	playerId: string;
	goalId: string;
}

type DeleteGoalUseCaseResponse = {};

export class DeleteGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		goalId,
		playerId,
	}: DeleteGoalUseCaseRequest): Promise<DeleteGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		if (playerId !== goal.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		await this.goalsRepository.delete(goal);

		return {};
	}
}
