import { WatchedList } from '@/core/entities/watched-list';
import type { GoalReward } from './goal-reward';

export class GoalRewardList extends WatchedList<GoalReward> {
	compareItems(a: GoalReward, b: GoalReward): boolean {
		return a.rewardId.equals(b.rewardId);
	}
}
