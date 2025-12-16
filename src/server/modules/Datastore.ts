// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { PlayerSaveData, DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";

const datastore = DataStoreService.GetDataStore("players_data");

export class Datastore {
    public static getPlayerData(userId: number): PlayerSaveData | undefined {
        let playerData: PlayerSaveData = DEFAULT_PLAYER_DATA;

        try {
            const result = datastore.GetAsync(tostring(userId));
            playerData = result?.[0] as PlayerSaveData ?? DEFAULT_PLAYER_DATA;
        } catch (error) {
            warn(`Failed to load data for ${userId} : ${error}`);
            return undefined;
        };

        return playerData;
    }

    public static setPlayerData(userId: number, data: PlayerSaveData): boolean {
        assert(data, "Invalid player data.");

        try {
            datastore.SetAsync(`${userId}`, data);
        } catch (error) {
            warn(`Failed to save data for ${userId}: ${error}`);
            return false;
        }

        return true;
    }
}
