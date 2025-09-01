import type { QuestRewardsRepository } from '@/domain/habbitTracker/application/repositories/quest-rewards-repository';
import type { QuestReward } from '@/domain/habbitTracker/enterprise/entities/quest-reward';

export class InMemoryQuestRewardsRepository implements QuestRewardsRepository {
	public items: QuestReward[] = [];

	async findManyByQuestId(questId: string) {
		const questRewards = this.items.filter(
			(item) => item.questId.toString() === questId,
		);

		return questRewards;
	}

	async deleteManyByQuestId(questId: string) {
		const questRewards = this.items.filter(
			(item) => item.questId.toString() !== questId,
		);

		this.items = questRewards;
	}

	async create(questReward: QuestReward) {
		this.items.push(questReward);
	}

	async findById(id: string) {
		const questReward = this.items.find((item) => item.id.toString() === id);

		if (!questReward) {
			return null;
		}

		return questReward;
	}

	async delete(questReward: QuestReward) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === questReward.id,
		);

		this.items.splice(itemIndex, 1);
	}

	async save(questReward: QuestReward) {
		const itemIndex = this.items.findIndex(
			(item) => item.id === questReward.id,
		);

		this.items[itemIndex] = questReward;
	}

	async findByQuestId(questId: string) {
		const reward = this.items.find(
			(item) => item.questId.toString() === questId,
		);

		if (!reward) {
			return null;
		}

		return reward;
	}
}
