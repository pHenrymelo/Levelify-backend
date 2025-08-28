import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface FetchPriorityQuestsUseCaseRequest {
	page: number;
}

interface FetchPriorityQuestsUseCaseResponse {
	quests: Quest[];
}

export class FetchPriorityQuestsUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		page,
	}: FetchPriorityQuestsUseCaseRequest): Promise<FetchPriorityQuestsUseCaseResponse> {
		const quests = await this.questsRepository.findManyPriority({ page });

		return {
			quests,
		};
	}
}
