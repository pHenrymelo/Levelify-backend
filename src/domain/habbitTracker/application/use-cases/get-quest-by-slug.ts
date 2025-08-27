import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface GetQuestBySlugUseCaseRequest {
	slug: string;
}

interface GetQuestBySlugUseCaseResponse {
	quest: Quest;
}

export class GetQuestBySlugUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		slug,
	}: GetQuestBySlugUseCaseRequest): Promise<GetQuestBySlugUseCaseResponse> {
		const quest = await this.questsRepository.findBySlug(slug);

		if (!quest) {
			throw new Error('Quest not found.');
		}

		return {
			quest,
		};
	}
}
