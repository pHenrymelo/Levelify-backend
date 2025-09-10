import { type Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface GetQuestBySlugUseCaseRequest {
	slug: string;
}

type GetQuestBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		quest: Quest;
	}
>;

export class GetQuestBySlugUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		slug,
	}: GetQuestBySlugUseCaseRequest): Promise<GetQuestBySlugUseCaseResponse> {
		const quest = await this.questsRepository.findBySlug(slug);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		return right({ quest });
	}
}
