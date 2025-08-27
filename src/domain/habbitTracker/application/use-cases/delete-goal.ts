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
		const quest = await this.goalsRepository.findById(goalId);

		if (!quest) {
			throw new Error('Goal not found.');
		}

		if (playerId !== quest.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		await this.goalsRepository.delete(quest);

		return {};
	}
}
