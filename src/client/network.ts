// client/network.ts
import { GlobalEvents, GlobalFunctions } from "shared/network";

export const ClientEvents = GlobalEvents.createClient({});
export const ClientFunctions = GlobalFunctions.createClient({});

ClientEvents.givePlayerMoney.connect((amount: number) => {
    print(`Received ${amount} money from server.`);
});