import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { Goal } from '../../enterprise/entities/goal';
import { GoalReward } from '../../enterprise/entities/goal-reward';
import { GoalRewardList } from '../../enterprise/entities/goal-reward-list';
import type { GoalRewardsRepository } from '../repositories/goal-rewards-repository';
import type { GoalsRepository } from '../repositories/goals-repository';

interface EditGoalUseCaseRegoal {
	goalId: string;
	statement: string;
	rewardIds: string[];
}

type EditGoalUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		goal: Goal;
	}
>;

export class EditGoalUseCase {
	constructor(
		private goalsRepository: GoalsRepository,
		private goalRewardsRepository: GoalRewardsRepository,
	) {}

	async execute({
		goalId,
		statement,
		rewardIds,
	}: EditGoalUseCaseRegoal): Promise<EditGoalUseCaseResponse> {
		const goal = await this.goalsRepository.findById(goalId);

		if (!goal) {
			return left(new ResourceNotFoundError());
		}

		const currentGoalRewards =
			await this.goalRewardsRepository.findManyByGoalId(goalId);

		const goalRewardList = new GoalRewardList(currentGoalRewards);

		const goalRewards = rewardIds.map((rewardId) => {
			return GoalReward.create({
				goalId: goal.id,
				rewardId: new UniqueEntityID(rewardId),
			});
		});

		goalRewardList.update(goalRewards);

		goal.statement = statement;
		goal.rewards = goalRewardList;

		await this.goalsRepository.save(goal);

		return right({ goal });
	}
}
