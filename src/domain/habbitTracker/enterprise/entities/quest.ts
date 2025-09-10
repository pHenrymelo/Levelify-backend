import dayjs from 'dayjs';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { UniqueEntityID } from '@/core/entities/unique-entity-id';
import type { Optional } from '@/core/types/optional';
import { PriorityQuestEvent } from '../events/priority-quest-event';
import { QuestRewardList } from './quest-reward-list';
import { Slug } from './value-objects/slug';

export interface QuestProps {
	title: string;
	description: string;
	playerId: UniqueEntityID;
	slug: Slug;
	rewards: QuestRewardList;
	createdAt: Date;
	updatedAt?: Date;
	dueDate: Date;
	completed: boolean;
}

const twentyfourHoursInMiliseconds = 24 * 60 * 60 * 1000;
export class Quest extends AggregateRoot<QuestProps> {
	static create(
		props: Optional<
			QuestProps,
			'createdAt' | 'slug' | 'dueDate' | 'completed' | 'rewards'
		>,
		id?: UniqueEntityID,
	) {
		const quest = new Quest(
			{
				...props,
				completed: false,
				createdAt: new Date(),
				slug: props.slug ?? Slug.createFromText(props.title),
				rewards: props.rewards ?? new QuestRewardList(),
				dueDate:
					props.dueDate ?? new Date(Date.now() + twentyfourHoursInMiliseconds),
			},
			id,
		);

		const isPriority = dayjs().diff(quest.dueDate, 'hour') <= 24;
		if (isPriority) {
			quest.addDomainEvent(new PriorityQuestEvent(quest));
		}

		return quest;
	}

	public get priority(): boolean {
		return dayjs().diff(this.dueDate, 'hour') <= 24;
	}

	private touch() {
		this.props.updatedAt = new Date();
	}

	public set title(title: string) {
		this.props.title = title;
		this.props.slug = Slug.createFromText(title);

		this.touch();
	}

	public set description(description: string) {
		this.props.description = description;

		this.touch();
	}

	public set dueDate(dueDate: Date) {
		this.props.dueDate = dueDate;
		this.touch();

		const isPriority = dayjs().diff(this.props.dueDate, 'hour') <= 24;
		if (isPriority) {
			this.addDomainEvent(new PriorityQuestEvent(this));
		}
	}

	public set completed(completed: boolean) {
		this.props.completed = completed;

		this.touch;
	}

	public set rewards(rewards: QuestRewardList) {
		this.props.rewards = rewards;

		this.touch;
	}

	public get title() {
		return this.props.title;
	}

	public get description() {
		return this.props.description;
	}

	public get playerId() {
		return this.props.playerId;
	}

	public get slug() {
		return this.props.slug;
	}

	public get rewards() {
		return this.props.rewards;
	}

	public get createdAt() {
		return this.props.createdAt;
	}

	public get updatedAt() {
		return this.props.updatedAt;
	}

	public get dueDate() {
		return this.props.dueDate;
	}

	public get completed() {
		return this.props.completed;
	}
}
