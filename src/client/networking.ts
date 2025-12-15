// src/client/network.ts
import { GlobalEvents, GlobalFunctions } from "shared/networking";

export const Events = GlobalEvents.createClient({});
export const Functions = GlobalFunctions.createClient({});

/* EVENTS */

Events.pong.connect((message: string) => {
    print("Server replied:", message);
});

/* CALL EXAMPLES */

Events.ping.fire("hello server!");
Events.ping2.fire();

const serverTime = Functions.getServerTime.invoke();
print("Server time:", serverTime);
