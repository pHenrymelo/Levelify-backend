import type { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Quest } from '../entities/quest';
import { Slug } from '../entities/value-objects/slug';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateQuestUseCaseRequest {
	title: string;
	description: string;
	playerId: UniqueEntityID;
	completed?: boolean;
}

export class CreateQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		title,
		description,
		playerId,
		completed,
	}: CreateQuestUseCaseRequest) {
		const quest = new Quest(
			{ title, description, playerId, slug: Slug.createFromText(title) },
			completed,
		);

		await this.questsRepository.create(quest);

		return quest;
	}
}
