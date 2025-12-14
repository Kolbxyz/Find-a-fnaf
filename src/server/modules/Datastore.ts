// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { playerService } from "server/services/PlayerService";
import { PlayerSaveData, DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";

const Datastore = DataStoreService.GetDataStore("players_data")

export function loadData(player: Player): PlayerSaveData {
    let playerData: PlayerSaveData = DEFAULT_PLAYER_DATA;

    const [success, ret] = pcall(() => {
        const result = Datastore.GetAsync(`${player.UserId}`);
        playerData = result?.[0] as PlayerSaveData ?? DEFAULT_PLAYER_DATA;
    });

    if (!success) {
        warn(`Failed to load data for ${player.Name}: ${ret}`);
        return DEFAULT_PLAYER_DATA;
    }

    playerService.playerData.set(player, playerData);
    print(`Successfully loaded data for ${player.Name}`);
    print(`Level: ${playerData.level}`);
    return playerData;
}

export function saveData(player: Player): boolean {
    const playerData = playerService.playerData.get(player);

    if (playerData === undefined) {
        warn(`No data to save for ${player.Name}`);
        return false;
    }

    const [success, errorMsg] = pcall(() => {
        Datastore.SetAsync(`${player.UserId}`, playerData);
    });

    if (!success) {
        warn(`Failed to save data for ${player.Name}: ${errorMsg}`);
        return false;
    }
    playerService.playerData.delete(player);
    print(`Successfully saved data for ${player.Name}`);
    return true;
}
