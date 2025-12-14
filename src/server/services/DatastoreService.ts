// src/server/services/DatastoreService.ts
import { loadData, saveData } from "server/modules/Datastore";
import { PlayerSaveData } from "server/types/PlayerSaveData";

class DatastoreService {
    constructor() {
        print("DatastoreService initialized");
    }

    load(player: Player): PlayerSaveData {
        return loadData(player);
    }

    save(player: Player): boolean {
        return saveData(player);
    }
}

export const datastoreService = new DatastoreService();