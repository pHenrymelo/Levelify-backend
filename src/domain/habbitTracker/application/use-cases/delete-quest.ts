import type { QuestsRepository } from '../repositories/quests-repository';

interface DeleteQuestUseCaseRequest {
	playerId: string;
	questId: string;
}

type DeleteQuestUseCaseResponse = {};

export class DeleteQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		questId,
		playerId,
	}: DeleteQuestUseCaseRequest): Promise<DeleteQuestUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			throw new Error('Quest not found.');
		}

		if (playerId !== quest.playerId.toString()) {
			throw new Error('Permission denied.');
		}

		await this.questsRepository.delete(quest);

		return {};
	}
}
