// src/server/services/PlayerService.ts
import { printName } from "shared/modules/Player";

export class PlayerService {
    playerData = new Map<Player, number>();

    constructor() {
        print("PlayerService initialized");
    }

    printName(player: Player) {
        printName(player);
        return player;
    }
}

export const playerService = new PlayerService();