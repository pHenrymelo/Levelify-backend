import { type Either, left, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestReward } from '../../enterprise/entities/quest-reward';
import type { QuestRewardsRepository } from '../repositories/quest-rewards-repository';
import type { QuestsRepository } from '../repositories/quests-repository';
import { PermissionDeniedError } from './errors/permission-denied-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface SetQuestRewardUseCaseRequest {
	questId: string;
	playerId: string;
	xpAmount?: number;
	goldAmount?: number;
}

type SetQuestRewardUseCaseResponse = Either<
	ResourceNotFoundError | PermissionDeniedError,
	{
		questReward: QuestReward;
	}
>;

export class SetQuestRewardUseCase {
	constructor(
		private questsRepository: QuestsRepository,
		private questRewardsRepository: QuestRewardsRepository,
	) {}

	async execute({
		playerId,
		questId,
		goldAmount,
		xpAmount,
	}: SetQuestRewardUseCaseRequest): Promise<SetQuestRewardUseCaseResponse> {
		const quest = await this.questsRepository.findById(questId);

		if (!quest) {
			return left(new ResourceNotFoundError());
		}

		if (playerId !== quest.playerId.toString()) {
			return left(new PermissionDeniedError());
		}

		const questReward = QuestReward.create({
			questId: new UniqueEntityID(questId),
			xpAmount,
			goldAmount,
		});

		await this.questRewardsRepository.create(questReward);

		return right({ questReward });
	}
}
