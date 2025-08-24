import { UniqueEntityID } from '../../core/entities/unique-entity-id';
import { Quest } from '../entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateQuestUseCaseRequest {
	title: string;
	description: string;
	playerId: string;
}

export class CreateQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({ title, description, playerId }: CreateQuestUseCaseRequest) {
		const quest = Quest.create({
			title,
			description,
			playerId: new UniqueEntityID(playerId),
		});

		await this.questsRepository.create(quest);

		return quest;
	}
}
