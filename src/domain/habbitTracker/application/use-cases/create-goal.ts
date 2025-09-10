import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import { Goal } from '../../enterprise/entities/goal';
import { GoalReward } from '../../enterprise/entities/goal-reward';
import { GoalRewardList } from '../../enterprise/entities/goal-reward-list';
import type { GoalsRepository } from '../repositories/goals-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateGoalUseCaseRequest {
	statement: string;
	questId: string;
	rewardIds: string[];
}

type CreateGoalUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		goal: Goal;
	}
>;

export class CreateGoalUseCase {
	constructor(
		private goalsRepository: GoalsRepository,
		private questsRepository: QuestsRepository,
	) {}

	async execute({
		questId,
		statement,
		rewardIds,
	}: CreateGoalUseCaseRequest): Promise<CreateGoalUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		const goal = Goal.create({
			questId: new UniqueEntityID(questId),
			statement,
		});

		const goalRewards = rewardIds.map((rewardId) => {
			return GoalReward.create({
				goalId: goal.id,
				rewardId: new UniqueEntityID(rewardId),
			});
		});

		goal.rewards = new GoalRewardList(goalRewards);

		await this.goalsRepository.create(goal);

		return right({ goal });
	}
}
