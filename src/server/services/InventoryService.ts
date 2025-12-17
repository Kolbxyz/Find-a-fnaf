// server/InventoryService.ts
import { OnStart, Service } from "@flamework/core";
import { LOGGING_LEVEL, VerboseService } from "shared/Utils/VerboseService";
import { Entity } from "shared/types/Entities";
import { PlayerService } from "./PlayerService";

@Service()
export class InventoryService implements OnStart {
	constructor(
		private VerboseService: VerboseService,
		private PlayerService: PlayerService,
	) {}

	onStart(): void {
		this.VerboseService.print("InventoryService has been initialized!", LOGGING_LEVEL.DEBUG);
	}

	addToCollection(player: Player, entity: Entity) {
		const playerData = this.PlayerService.playerData.get(player);

		playerData?.collection?.push(entity.id);
		if (playerData?.collection) {
			this.PlayerService.playerData.set(player, playerData);
			this.VerboseService.print(string.format("%s got a %s", player.Name, entity.name));
		}
	}
}
