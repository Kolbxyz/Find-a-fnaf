// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { PlayerSaveData, DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";

const datastore = DataStoreService.GetDataStore("players_data");

const MAX_RETRIES = 3;
const RETRY_DELAY = 1;

function deepCopy<T>(data: T): T {
    if (typeIs(data, "table")) {
        const copy: any = {};
        for (const [key, value] of pairs(data as any)) {
            copy[key] = deepCopy(value);
        }
        return copy as T;
    }
    return data;
}

export class Datastore {
    public static getPlayerData(userId: number): PlayerSaveData {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const result = datastore.GetAsync(tostring(userId));
                if (result !== undefined) {
                    return result[0] as PlayerSaveData;
                }
                return deepCopy(DEFAULT_PLAYER_DATA);
            } catch (error) {
                warn(`[Datastore] Load failed (${attempt}/${MAX_RETRIES}) for ${userId}: ${error}`);
                task.wait(RETRY_DELAY * attempt);
            }
        }

        warn(`[Datastore] Giving up loading data for ${userId}`);
        return deepCopy(DEFAULT_PLAYER_DATA);
    }

    public static setPlayerData(userId: number, data: PlayerSaveData): boolean {
        assert(data, "Invalid player data.");

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                datastore.SetAsync(tostring(userId), data);
                return true;
            } catch (error) {
                warn(`[Datastore] Save failed (${attempt}/${MAX_RETRIES}) for ${userId}: ${error}`);
                task.wait(RETRY_DELAY * attempt);
            }
        }

        warn(`[Datastore] Giving up saving data for ${userId}`);
        return false;
    }
}
