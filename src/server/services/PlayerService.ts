// src/server/services/PlayerService.ts
import { printName } from "shared/modules/Player";
import { PlayerSaveData } from "server/types/PlayerSaveData";

export class PlayerService {
    playerData = new Map<Player, PlayerSaveData>();

    constructor() {
        print("PlayerService initialized");
    }

    printName(player: Player) {
        printName(player);
        return player;
    }
}

export const playerService = new PlayerService();