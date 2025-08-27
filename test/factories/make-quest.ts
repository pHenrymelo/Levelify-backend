import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import {
	Quest,
	type QuestProps,
} from '@/domain/habbitTracker/enterprise/entities/quest';

export function MakeQuest(overide: Partial<QuestProps> = {}) {
	const quest = Quest.create({
		playerId: new UniqueEntityID('player-1-id'),
		title: 'quest title',
		description: 'quest description ',
		...overide,
	});

	return quest;
}
