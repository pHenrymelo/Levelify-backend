import { type Either, left, right } from '@/core/either';
import type { QuestsRepository } from '../repositories/quests-repository';
import { PermissionDeniedError } from './errors/permission-denied-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteQuestUseCaseRequest {
	playerId: string;
	questId: string;
}

type DeleteQuestUseCaseResponse = Either<
	ResourceNotFoundError | PermissionDeniedError,
	{}
>;

export class DeleteQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		questId,
		playerId,
	}: DeleteQuestUseCaseRequest): Promise<DeleteQuestUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		if (playerId !== quest.playerId.toString()) {
			return left(new PermissionDeniedError());
		}

		await this.questsRepository.delete(quest);

		return right({});
	}
}
