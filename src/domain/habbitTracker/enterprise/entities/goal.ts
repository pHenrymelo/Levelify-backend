import { Entity } from '@/core/entities/entity';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import { GoalRewardList } from './goal-reward-list';

export interface GoalProps {
	statement: string;
	questId: UniqueEntityID;
	completed: boolean;
	rewards: GoalRewardList;
}

export class Goal extends Entity<GoalProps> {
	static create(
		props: Optional<GoalProps, 'completed' | 'rewards'>,
		id?: UniqueEntityID,
	) {
		const goal = new Goal(
			{
				...props,
				completed: props.completed ?? false,
				rewards: props.rewards ?? new GoalRewardList(),
			},
			id,
		);

		return goal;
	}

	public set statement(statement: string) {
		this.props.statement = statement;
	}

	public set completed(completed: boolean) {
		this.props.completed = completed;
	}

	public set rewards(rewards: GoalRewardList) {
		this.props.rewards = rewards;
	}

	public get statement() {
		return this.props.statement;
	}

	public get questId() {
		return this.props.questId;
	}

	public get completed() {
		return this.props.completed;
	}

	public get rewards() {
		return this.props.rewards;
	}
}
