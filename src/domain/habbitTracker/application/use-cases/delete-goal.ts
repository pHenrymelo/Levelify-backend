import type { GoalsRepository } from '../repositories/goals-repository';

interface DeleteGoalUseCaseRequest {
	goalId: string;
}

type DeleteGoalUseCaseResponse = {};

export class DeleteGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		goalId,
	}: DeleteGoalUseCaseRequest): Promise<DeleteGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		await this.goalsRepository.delete(goal);

		return {};
	}
}
