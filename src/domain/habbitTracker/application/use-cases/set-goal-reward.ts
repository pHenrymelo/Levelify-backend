import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { GoalReward } from '../../enterprise/entities/goal-reward';
import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';
import type { GoalsRepository } from '../repositories/goals-repository';

interface SetGoalRewardUseCaseRegoal {
	goalId: string;
	playerId: string;
	xpAmount?: number;
	goldAmount?: number;
}

interface SetGoalRewardUseCaseResponse {
	goalReward: GoalReward;
}

export class SetGoalRewardUseCase {
	constructor(
		private goalsRepository: GoalsRepository,
		private goalRewardsRepository: GoalRewardsRepository,
	) {}

	async execute({
		goalId,
		goldAmount,
		xpAmount,
	}: SetGoalRewardUseCaseRegoal): Promise<SetGoalRewardUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			throw new Error('Goal not found.');
		}

		const goalReward = GoalReward.create({
			goalId: new UniqueEntityID(goalId),
			xpAmount,
			goldAmount,
		});

		await this.goalRewardsRepository.create(goalReward);

		return {
			goalReward,
		};
	}
}
