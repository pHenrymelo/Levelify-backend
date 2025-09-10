import { type Either, right } from '@/core/either';
import type { Goal } from '../../enterprise/entities/goal';
import type { GoalsRepository } from '../repositories/goals-repository';

interface FetchQuestGoalsUseCaseRequest {
	questId: string;
	page: number;
}

type FetchQuestGoalsUseCaseResponse = Either<
	null,
	{
		goals: Goal[];
		conclusionPercentual: number;
	}
>;

export class FetchQuestGoalsUseCase {
	constructor(private goalsRepository: GoalsRepository) {}

	async execute({
		questId,
		page,
	}: FetchQuestGoalsUseCaseRequest): Promise<FetchQuestGoalsUseCaseResponse> {
		const goals = await this.goalsRepository.findManyByQuestId(questId, {
			page,
		});

		const conclusionPercentual = Math.round(
			(goals.filter((goal) => goal.completed).length / goals.length) * 100,
		);

		return right({
			goals,
			conclusionPercentual,
		});
	}
}
