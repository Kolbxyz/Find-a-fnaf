// src/server/services/DatastoreService.ts
import { loadData, saveData } from "server/modules/Datastore";

export class DatastoreService {
    constructor() {
        print("DatastoreService initialized");
    }

    load(player: Player) {
        loadData(player);
        return player;
    }

    save(player: Player) {
        return saveData(player);
    }
}

export const datastoreService = new DatastoreService();