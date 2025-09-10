import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { PermissionDeniedError } from '../../../../core/errors/permission-denied-error';
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error';
import type { Quest } from '../../enterprise/entities/quest';
import { QuestReward } from '../../enterprise/entities/quest-reward';
import { QuestRewardList } from '../../enterprise/entities/quest-reward-list';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';
import type { QuestsRepository } from '../repositories/quests-repository';

interface EditQuestUseCaseRequest {
	playerId: string;
	questId: string;
	title: string;
	description: string;
	dueDate: Date;
	rewardIds: string[];
}

type EditQuestUseCaseResponse = Either<
	ResourceNotFoundError | PermissionDeniedError,
	{
		quest: Quest;
	}
>;

export class EditQuestUseCase {
	constructor(
		private questsRepository: QuestsRepository,
		private questRewardsRepository: QuestRewardsRepository,
	) {}

	async execute({
		questId,
		playerId,
		title,
		description,
		dueDate,
		rewardIds,
	}: EditQuestUseCaseRequest): Promise<EditQuestUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		if (playerId !== quest.playerId.toString()) {
			return left(new PermissionDeniedError());
		}

		const currentQuestRewards =
			await this.questRewardsRepository.findManyByQuestId(questId);

		const questRewardList = new QuestRewardList(currentQuestRewards);

		const questRewards = rewardIds.map((rewardId) => {
			return QuestReward.create({
				questId: quest.id,
				rewardId: new UniqueEntityID(rewardId),
			});
		});

		questRewardList.update(questRewards);

		quest.title = title;
		quest.description = description;
		quest.dueDate = dueDate;
		quest.rewards = questRewardList;

		await this.questsRepository.save(quest);

		return right({ quest });
	}
}
