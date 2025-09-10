import { type Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CheckGoalUseCaseRegoal {
	goalId: string;
}

type CheckGoalUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		goal: Goal;
	}
>;

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
			return left(new ResourceNotFoundError());
		}

		const quest = await this.questsRepository.findById(goal.questId.toValue());

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		goal.completed = !goal.completed;

		await this.goalsRepository.save(goal);

		return right({
			goal,
		});
	}
}
