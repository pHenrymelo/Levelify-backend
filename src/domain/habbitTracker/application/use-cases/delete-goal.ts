import { type Either, left, right } from '@/core/either';
import type { GoalsRepository } from '../repositories/goals-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteGoalUseCaseRequest {
	goalId: string;
}

type DeleteGoalUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		goalId,
	}: DeleteGoalUseCaseRequest): Promise<DeleteGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			return left(new ResourceNotFoundError());
		}

		await this.goalsRepository.delete(goal);

		return right({});
	}
}
