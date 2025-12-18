import ProfileStore from "@rbxts/profile-store";
import { Players } from "@rbxts/services";
import { OnStart, Service } from "@flamework/core";
import { DEFAULT_PLAYER_DATA } from "server/types/PlayerSaveData";

const PlayerStore = ProfileStore.New("PlayerStore", DEFAULT_PLAYER_DATA);

const Profiles = new Map<Player, unknown>();

type RuntimeProfile = {
	Data: typeof DEFAULT_PLAYER_DATA;
	AddUserId(id: number): void;
	Reconcile(): void;
	EndSession(): void;
	OnSessionEnd: RBXScriptSignal;
};

const isProfile = (v: unknown): v is RuntimeProfile => {
	return typeIs(v, "table");
};

@Service()
export class DatastoreService implements OnStart {
	playerAdded(player: Player) {
		const rawProfile = PlayerStore.StartSessionAsync(`${player.UserId}`, {
			Cancel: () => player.Parent !== Players,
		});

		if (isProfile(rawProfile)) {
			const profile = rawProfile;

			profile.AddUserId(player.UserId);
			profile.Reconcile();

			profile.OnSessionEnd.Connect(() => {
				Profiles.delete(player);
				player.Kick("profile session end - please rejoin");
			});

			if (player.Parent === Players) {
				Profiles.set(player, profile);
				profile.Data.money += 100;
			} else {
				profile.EndSession();
			}
		} else {
			player.Kick("profile load fail - please rejoin");
		}
	}

	playerRemoving(player: Player) {
		const profile = Profiles.get(player);
		if (isProfile(profile)) {
			profile.EndSession();
		}
	}

	onStart(): void {
		for (const player of Players.GetPlayers()) {
			coroutine.wrap(() => this.playerAdded(player))();
		}

		Players.PlayerAdded.Connect((player: Player) => {
			this.playerAdded(player);
		});
		Players.PlayerRemoving.Connect((player: Player) => {
			this.playerRemoving(player);
		});
	}
}
