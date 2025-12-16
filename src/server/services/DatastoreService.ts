// src/server/services/DatastoreService.ts
import { Service, OnStart, OnInit } from "@flamework/core";
import { Players, RunService } from "@rbxts/services";
import { PlayerService } from "./PlayerService";
import { VerboseService, LOGGING_LEVEL } from "shared/Utils/VerboseService";
import { ServerEvents } from "server/network";
import { Datastore } from "server/modules/Datastore";
import { DEFAULT_PLAYER_DATA, PlayerSaveData } from "server/types/PlayerSaveData";

@Service()
export class DatastoreService implements OnStart, OnInit {
    constructor(
        private VerboseService: VerboseService,
        private PlayerService: PlayerService
    ) { }

    onInit() {
        this.VerboseService.print("DatastoreService initialized", LOGGING_LEVEL.DEBUG);
    }

    public load(player: Player): PlayerSaveData {
        const playerData = Datastore.getPlayerData(player.UserId);
        this.VerboseService.print(`Successfully loaded data for ${player.Name}`, LOGGING_LEVEL.DEBUG);

        if (!playerData) {
            player.Kick("We couldn't retrieve your data. If you encounter this issue again, please contact a dev.")
            return DEFAULT_PLAYER_DATA;
        }
        if (playerData.money === 0) {
            playerData.money += 100;
            ServerEvents.givePlayerMoney(player, 100);
        }

        this.PlayerService.playerData.set(player, playerData);
        this.VerboseService.print(`Level: ${playerData.level}`, LOGGING_LEVEL.DEBUG);
        this.VerboseService.print(`Money: ${playerData.money}`, LOGGING_LEVEL.DEBUG);
        return playerData;
    }

    public save(player: Player): boolean {
        const playerData = this.PlayerService.playerData.get(player);

        if (playerData === undefined) {
            this.VerboseService.warn(`No data to save for ${player.Name}`, LOGGING_LEVEL.NORMAL);
            return false;
        }

        const success = Datastore.setPlayerData(player.UserId, playerData);
        if (success) {
            this.VerboseService.print(`Successfully saved data for ${player.Name}`, LOGGING_LEVEL.NORMAL);
        }
        return success;
    }

    onStart(): void {
        Players.PlayerAdded.Connect((player) => {
            const playerData = this.load(player);
            this.PlayerService.printName(player);
            this.PlayerService.playerData.set(player, playerData);
        });

        Players.PlayerRemoving.Connect((player) => {
            this.save(player);
            this.PlayerService.playerData.delete(player);
        });

        game.BindToClose(() => { task.wait(RunService.IsStudio() ? 5 : 30) })
    }
}
