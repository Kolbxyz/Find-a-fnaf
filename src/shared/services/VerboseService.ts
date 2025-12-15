// src/server/services/VerboseService.ts
import { RunService } from "@rbxts/services";

export enum LOGGING_LEVEL {
    SILENT = 1,
    QUIET,
    NORMAL,
    DEBUG
}

class VerboseService {
    LOGGING_LEVEL: number;

    constructor(level: LOGGING_LEVEL | undefined) {
        this.LOGGING_LEVEL = level ?? LOGGING_LEVEL.NORMAL;
        print("VerboseService initalized");
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

export const verboseService = new VerboseService(RunService.IsStudio() ? LOGGING_LEVEL.DEBUG : LOGGING_LEVEL.NORMAL);
