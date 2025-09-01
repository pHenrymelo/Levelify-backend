import { type Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Quest } from '../../enterprise/entities/quest';
import { QuestReward } from '../../enterprise/entities/quest-reward';
import { QuestRewardList } from '../../enterprise/entities/quest-reward-list';
import type { QuestsRepository } from '../repositories/quests-repository';

interface CreateQuestUseCaseRequest {
	title: string;
	description: string;
	playerId: string;
	rewardIds: string[];
}

type CreateQuestUseCaseResponse = Either<
	null,
	{
		quest: Quest;
	}
>;

export class CreateQuestUseCase {
	constructor(private questsRepository: QuestsRepository) {}

	async execute({
		title,
		description,
		playerId,
		rewardIds,
	}: CreateQuestUseCaseRequest): Promise<CreateQuestUseCaseResponse> {
		const quest = Quest.create({
			title,
			description,
			playerId: new UniqueEntityID(playerId),
		});

		const questRewards = rewardIds.map((rewardId) => {
			return QuestReward.create({
				questId: quest.id,
				rewardId: new UniqueEntityID(rewardId),
			});
		});

		quest.rewards = new QuestRewardList(questRewards);

		await this.questsRepository.create(quest);

		return right({ quest });
	}
}
