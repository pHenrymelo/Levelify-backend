import { type Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';

interface DeleteGoalRewardUseCaseRegoal {
	goalRewardId: string;
}

type DeleteGoalRewardUseCaseResponse = Either<ResourceNotFoundError, {}>;

export class DeleteGoalRewardUseCase {
	constructor(private goalRewardsRepository: GoalRewardsRepository) {}

	async execute({
		goalRewardId,
	}: DeleteGoalRewardUseCaseRegoal): Promise<DeleteGoalRewardUseCaseResponse> {
		const goalReward = await this.goalRewardsRepository.findById(goalRewardId);

		if (!goalReward) {
			return left(new ResourceNotFoundError());
		}

		await this.goalRewardsRepository.delete(goalReward);

		return right({});
	}
}
