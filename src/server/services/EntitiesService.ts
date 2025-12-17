// server/services/EntitiesService.ts
import { OnStart, Service } from "@flamework/core";
import { getRandom } from "server/modules/Entities";
import { Entity } from "shared/types/Entities";
import { LOGGING_LEVEL, VerboseService } from "shared/Utils/VerboseService";

@Service()
export class EntitiesService implements OnStart {
	constructor(private VerboseService: VerboseService) {}

	onStart(): void {
		this.VerboseService.print("EntitiesService has been initialized!", LOGGING_LEVEL.DEBUG);
	}

	create(): Entity {
		return getRandom();
	}
}
