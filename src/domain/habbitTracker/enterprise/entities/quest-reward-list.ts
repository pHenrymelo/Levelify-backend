import { WatchedList } from '@/core/entities/watched-list';
import type { QuestReward } from './quest-reward';

export class QuestRewardList extends WatchedList<QuestReward> {
	compareItems(a: QuestReward, b: QuestReward): boolean {
		return a.rewardId.equals(b.rewardId);
	}
}
