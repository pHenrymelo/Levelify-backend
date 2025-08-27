import type { Quest } from '../../enterprise/entities/quest';
import type { QuestsRepository } from '../repositories/quests-repository';

interface EditQuestUseCaseRequest {
	playerId: string;
	questId: string;
	title: string;
	description: string;
	dueDate: Date;
}

type EditQuestUseCaseResponse = {
	quest: Quest;
};

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
			throw new Error('Quest not found.');
		}

		if (playerId !== quest.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		quest.title = title;
		quest.description = description;
		quest.dueDate = dueDate;

		await this.questsRepository.save(quest);

		return {
			quest,
		};
	}
}
