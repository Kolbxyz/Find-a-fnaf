// src/server/services/DatastoreService.ts
import { loadData } from "server/modules/Datastore";

export class DatastoreService {
    constructor() {
        print("DatastoreService initialized");
    }

    load(player: Player) {
        loadData(player);
        return player;
    }
}

export const datastoreService = new DatastoreService();