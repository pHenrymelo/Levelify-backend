import { type Either, left, right } from '@/core/either';
import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';
import { PermissionDeniedError } from './errors/permission-denied-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditQuestUseCaseRequest {
	playerId: string;
	questId: string;
	title: string;
	description: string;
	dueDate: Date;
}

type EditQuestUseCaseResponse = Either<
	ResourceNotFoundError | PermissionDeniedError,
	{
		quest: Quest;
	}
>;

export class EditQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		questId,
		playerId,
		title,
		description,
		dueDate,
	}: EditQuestUseCaseRequest): Promise<EditQuestUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		if (playerId !== quest.playerId.toString()) {
			return left(new PermissionDeniedError());
		}

		quest.title = title;
		quest.description = description;
		quest.dueDate = dueDate;

		await this.questsRepository.save(quest);

		return right({ quest });
	}
}
