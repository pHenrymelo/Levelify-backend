import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateQuestUseCaseRequest {
	title: string;
	description: string;
	playerId: string;
}

interface CreateQuestUseCaseResponse {
	quest: Quest;
}

export class CreateQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		title,
		description,
		playerId,
	}: CreateQuestUseCaseRequest): Promise<CreateQuestUseCaseResponse> {
		const quest = Quest.create({
			title,
			description,
			playerId: new UniqueEntityID(playerId),
		});

		await this.questsRepository.create(quest);

		return {
			quest,
		};
	}
}
