// client/controllers/test.ts
import { Controller, OnStart } from "@flamework/core";
import { ClientEvents } from "client/network";

@Controller()
export class test implements OnStart {
    onStart(): void {
        ClientEvents.event.fire("Hi there");
    }
}
