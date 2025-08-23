import type { Quest } from '../entities/quest';

export interface QuestsRepository {
	create(quest: Quest): Promise<void>;
}
