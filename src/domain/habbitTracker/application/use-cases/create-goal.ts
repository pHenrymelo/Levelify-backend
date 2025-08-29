import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';
import type { QuestsRepository } from '../repositories/quests-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CreateGoalUseCaseRequest {
	statement: string;
	questId: string;
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
	}: CreateGoalUseCaseRequest): Promise<CreateGoalUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		const goal = Goal.create({
			questId: new UniqueEntityID(questId),
			statement,
		});

		await this.goalsRepository.create(goal);

		return right({ goal });
	}
}
