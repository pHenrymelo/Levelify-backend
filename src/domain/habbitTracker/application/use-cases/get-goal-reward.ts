import type { GoalReward } from '../../enterprise/entities/goal-reward';
import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';

interface GetGoalRewardUseCaseRegoal {
	goalId: string;
}

interface GetGoalRewardUseCaseResponse {
	goalReward: GoalReward;
}

export class GetGoalRewardUseCase {
	constructor(private goalRewardsRepository: GoalRewardsRepository) {}

	async execute({
		goalId,
	}: GetGoalRewardUseCaseRegoal): Promise<GetGoalRewardUseCaseResponse> {
		const goalReward = await this.goalRewardsRepository.findByGoalId(goalId);

		if (!goalReward) {
			throw new Error('Goal not found.');
		}

		return {
			goalReward,
		};
	}
}
