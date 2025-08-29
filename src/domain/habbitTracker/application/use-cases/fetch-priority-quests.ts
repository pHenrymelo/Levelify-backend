import { type Either, right } from '@/core/either';
import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface FetchPriorityQuestsUseCaseRequest {
	page: number;
}

type FetchPriorityQuestsUseCaseResponse = Either<
	null,
	{
		quests: Quest[];
	}
>;

export class FetchPriorityQuestsUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		page,
	}: FetchPriorityQuestsUseCaseRequest): Promise<FetchPriorityQuestsUseCaseResponse> {
		const quests = await this.questsRepository.findManyPriority({ page });

		return right({ quests });
	}
}
