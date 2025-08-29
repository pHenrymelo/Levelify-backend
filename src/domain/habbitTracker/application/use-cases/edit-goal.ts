import { type Either, left, right } from '@/core/either';
import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditGoalUseCaseRegoal {
	goalId: string;
	statement: string;
}

type EditGoalUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		goal: Goal;
	}
>;

export class EditGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		goalId,
		statement,
	}: EditGoalUseCaseRegoal): Promise<EditGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			return left(new ResourceNotFoundError());
		}

		goal.statement = statement;

		await this.goalsRepository.save(goal);

		return right({ goal });
	}
}
