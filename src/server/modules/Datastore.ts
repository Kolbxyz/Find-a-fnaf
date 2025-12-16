// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { PlayerSaveData, DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";

const datastore = DataStoreService.GetDataStore("players_data");

export class Datastore {
    public static getPlayerData(userId: number): PlayerSaveData {
        let playerData: PlayerSaveData = DEFAULT_PLAYER_DATA;

        const [success, ret] = pcall(() => {
            const result = datastore.GetAsync(tostring(userId));
            playerData = result?.[0] as PlayerSaveData ?? DEFAULT_PLAYER_DATA;
        });

        if (!success) {
            warn(`Failed to load data for ${userId}: ${ret}`);
            return DEFAULT_PLAYER_DATA;
        }

        return playerData;
    }

    public static setPlayerData(userId: number, data: PlayerSaveData): boolean {
        const [success, errorMsg] = pcall(() => {
            datastore.SetAsync(`${userId}`, data);
        });

        if (!success) {
            warn(`Failed to save data for ${userId}: ${errorMsg}`);
            return false;
        }

        return true;
    }
}
