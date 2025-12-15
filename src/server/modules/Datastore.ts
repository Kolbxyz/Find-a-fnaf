// src/server/modules/Datastore.ts
import { DataStoreService } from "@rbxts/services";
import { playerService } from "server/services/PlayerService";
import { PlayerSaveData, DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";
import { verboseService, LOGGING_LEVEL } from "shared/services/VerboseService";

const Datastore = DataStoreService.GetDataStore("players_data")

export function loadData(player: Player): PlayerSaveData {
    let playerData: PlayerSaveData = DEFAULT_PLAYER_DATA;

    const [success, ret] = pcall(() => {
        const result = Datastore.GetAsync(`${player.UserId}`);
        playerData = result?.[0] as PlayerSaveData ?? DEFAULT_PLAYER_DATA;
    });

    if (!success) {
        verboseService.warn(`Failed to load data for ${player.Name}: ${ret}`, LOGGING_LEVEL.NORMAL);
        return DEFAULT_PLAYER_DATA;
    }

    playerService.playerData.set(player, playerData);
    verboseService.print(`Successfully loaded data for ${player.Name}`, LOGGING_LEVEL.DEBUG);
    print(`Level: ${playerData.level}`);
    return playerData;
}

export function saveData(player: Player): boolean {
    const playerData = playerService.playerData.get(player);

    if (playerData === undefined) {
        verboseService.warn(`No data to save for ${player.Name}`, LOGGING_LEVEL.NORMAL);
        return false;
    }

    const [success, errorMsg] = pcall(() => {
        Datastore.SetAsync(`${player.UserId}`, playerData);
    });

    if (!success) {
        verboseService.warn(`Failed to save data for ${player.Name}: ${errorMsg}`, LOGGING_LEVEL.NORMAL);
        return false;
    }
    playerService.playerData.delete(player);
    verboseService.print(`Successfully saved data for ${player.Name}`, LOGGING_LEVEL.NORMAL);
    return true;
}
