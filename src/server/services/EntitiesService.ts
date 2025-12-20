// server/services/EntitiesService.ts
import { OnStart, Service } from "@flamework/core";
import { getRandom } from "server/modules/Entities";
import { ServerFunctions } from "server/network";
import { Entity } from "shared/types/Entities";
import { LOGGING_LEVEL, VerboseService } from "shared/Utils/Verbose";
import { PlayerService } from "./PlayerService";

@Service()
export class EntitiesService implements OnStart {
	constructor(
		private VerboseService: VerboseService,
		private PlayerService: PlayerService,
	) {}
	onStart(): void {
		this.VerboseService.print("EntitiesService has been initialized!", LOGGING_LEVEL.DEBUG);
		ServerFunctions.getCollection.setCallback((player: Player) => {
			const data = this.PlayerService.playerData.get(player);
			return data ? data.collection : [];
		});
	}

	create(): Entity {
		return getRandom();
	}
}
