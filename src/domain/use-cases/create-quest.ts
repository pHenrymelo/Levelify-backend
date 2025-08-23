import { Quest } from '../entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateQuestUseCaseRequest {
	title: string;
	description: string;
	playerId: string;
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
		const quest = new Quest({ title, description, playerId }, completed);

		await this.questsRepository.create(quest);

		return quest;
	}
}
