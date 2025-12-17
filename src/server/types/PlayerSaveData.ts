// src/shared/types/PlayerSaveData.ts
export interface PlayerSaveData {
	money: number;
	level: number;
	collection: string[];
}

export const DEFAULT_PLAYER_DATA: PlayerSaveData = {
	money: 0,
	level: 1,
	collection: [],
};
