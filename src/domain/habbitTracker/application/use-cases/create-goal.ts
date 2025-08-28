import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateGoalUseCaseRequest {
	statement: string;
	questId: string;
}

interface CreateGoalUseCaseResponse {
	goal: Goal;
}

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
			throw new Error('Quest not found.');
		}

		const goal = Goal.create({
			questId: new UniqueEntityID(questId),
			statement,
		});

		await this.goalsRepository.create(goal);

		return {
			goal,
		};
	}
}
