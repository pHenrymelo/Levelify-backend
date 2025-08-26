import type { Player } from '../../enterprise/entities/player';

export interface PlayersRepository {
	create(player: Player): Promise<void>;
}
