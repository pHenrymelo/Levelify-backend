import { type Either, left, right } from '@/core/either';
import type { GoalReward } from '../../enterprise/entities/goal-reward';
import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetGoalRewardUseCaseRegoal {
	goalId: string;
}

type GetGoalRewardUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		goalReward: GoalReward;
	}
>;

export class GetGoalRewardUseCase {
	constructor(private goalRewardsRepository: GoalRewardsRepository) {}

	async execute({
		goalId,
	}: GetGoalRewardUseCaseRegoal): Promise<GetGoalRewardUseCaseResponse> {
		const goalReward = await this.goalRewardsRepository.findByGoalId(goalId);

		if (!goalReward) {
			return left(new ResourceNotFoundError());
		}

		return right({ goalReward });
	}
}
