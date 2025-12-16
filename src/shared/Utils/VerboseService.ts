// src/server/services/VerboseService.ts
import { Service, OnInit } from "@flamework/core";

export enum LOGGING_LEVEL {
    SILENT = 1,
    QUIET,
    NORMAL,
    DEBUG
}

@Service()
export class VerboseService implements OnInit {
    LOGGING_LEVEL: number = LOGGING_LEVEL.NORMAL;

    onInit() {
        print("VerboseService initalized");
    }

    changeVerbose(level: LOGGING_LEVEL) {
        this.LOGGING_LEVEL = level;
    }

    print(msg: string, level: LOGGING_LEVEL) {
        if (level <= this.LOGGING_LEVEL)
            print(msg);
    }

    warn(msg: string, level: LOGGING_LEVEL) {
        if (level <= this.LOGGING_LEVEL)
            warn(msg);
    }
}
