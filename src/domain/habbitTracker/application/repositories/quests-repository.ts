import type { Quest } from '../../enterprise/entities/quest';

export interface QuestsRepository {
	create(quest: Quest): Promise<void>;
}
