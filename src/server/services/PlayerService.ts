// src/server/services/PlayerService.ts
import { printName } from "shared/modules/Player";
import { PlayerSaveData } from "server/types/PlayerSaveData";
import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { DatastoreService } from "./DatastoreService";

@Service()
export class PlayerService implements OnStart {
	playerData = new Map<Player, PlayerSaveData>();

	constructor(private DatastoreService: DatastoreService) {}

	printName(player: Player) {
		printName(player);
		return player;
	}

	onStart() {
		print("PlayerService initialized");

		for (const player of Players.GetPlayers()) {
			coroutine.wrap(() => this.DatastoreService.playerAdded(player))();
		}

		Players.PlayerAdded.Connect((player: Player) => {
			const data = this.DatastoreService.playerAdded(player);
			if (data) this.playerData.set(player, data);
		});
		Players.PlayerRemoving.Connect((player: Player) => {
			this.DatastoreService.playerRemoving(player);
			this.playerData.delete(player);
		});
	}
}
