import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';

interface CreateGoalUseCaseRequest {
	statement: string;
	questId: string;
	playerId: string;
}

interface CreateGoalUseCaseResponse {
	goal: Goal;
}

export class CreateGoalUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		questId,
		playerId,
		statement,
	}: CreateGoalUseCaseRequest): Promise<CreateGoalUseCaseResponse> {
		const goal = Goal.create({
			questId: new UniqueEntityID(questId),
			playerId: new UniqueEntityID(playerId),
			statement,
		});

		await this.goalsRepository.create(goal);

		return {
			goal,
		};
	}
}
