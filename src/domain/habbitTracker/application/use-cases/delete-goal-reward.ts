import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';

interface DeleteGoalRewardUseCaseRegoal {
	goalRewardId: string;
}

type DeleteGoalRewardUseCaseResponse = {};

export class DeleteGoalRewardUseCase {
	constructor(private goalRewardsRepository: GoalRewardsRepository) {}

	async execute({
		goalRewardId,
	}: DeleteGoalRewardUseCaseRegoal): Promise<DeleteGoalRewardUseCaseResponse> {
		const goalReward = await this.goalRewardsRepository.findById(goalRewardId);

		if (!goalReward) {
			throw new Error('Goal Reward not found.');
		}

		await this.goalRewardsRepository.delete(goalReward);

		return {};
	}
}
