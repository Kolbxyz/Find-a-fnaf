// server/InventoryService.ts
import { Service } from "@flamework/core";
import { LOGGING_LEVEL, VerboseService } from "shared/Utils/VerboseService";
import { getRandom, Entity } from "server/modules/Entities";
import { PlayerService } from "./PlayerService";

@Service()
export class InventoryService {
    constructor(
        private VerboseService: VerboseService,
        private PlayerService: PlayerService
    ) { }

    addEntity(player: Player, entity: Entity) {
        let playerData = this.PlayerService.playerData.get(player);

        (playerData?.collection)?.push(entity.id);
        if (playerData?.collection) {
            this.PlayerService.playerData.set(player, playerData);
            this.VerboseService.print(
                string.format("%s got a %s", player.Name, entity.name),
                LOGGING_LEVEL.NORMAL
            );
        }
    }
}
