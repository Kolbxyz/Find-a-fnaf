// src/server/services/DatastoreService.ts
import { loadData, saveData } from "server/modules/Datastore";
import { PlayerSaveData } from "server/types/PlayerSaveData";
import { verboseService, LOGGING_LEVEL } from "shared/services/VerboseService";

class DatastoreService {
    constructor() {
        verboseService.print("DatastoreService initialized", LOGGING_LEVEL.DEBUG);
    }

    load(player: Player): PlayerSaveData {
        return loadData(player);
    }

    save(player: Player): boolean {
        return saveData(player);
    }
}

export const datastoreService = new DatastoreService();