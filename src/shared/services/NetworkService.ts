// src/server/services/NetworkService.ts
import { verboseService, LOGGING_LEVEL } from "shared/services/VerboseService";
type RemoteType = RemoteEvent | RemoteFunction | BindableEvent | BindableFunction;

enum RemoteTypeId {
    RemoteEvent = 1,
    RemoteFunction,
    BindableEvent,
    BindableFunction
}

const RemoteMap = {
    [RemoteTypeId.RemoteEvent]: "RemoteEvent",
    [RemoteTypeId.RemoteFunction]: "RemoteFunction",
    [RemoteTypeId.BindableEvent]: "BindableEvent",
    [RemoteTypeId.BindableFunction]: "BindableFunction",
} as const;

export class RemoteInstance {
    name: string;
    type: RemoteTypeId;
    object: RemoteType;
    func: () => {} | void;

    constructor(name: string, typeName: RemoteTypeId, category: RemoteType) {
        this.name = name;
        this.type = typeName;
        this.object = category;
        this.func = () => { };
    }

    bind(func: (...args: any) => {} | void) {
        this.func = func;
    }

    connect() {
        const remoteObject = this.object;

        switch (this.type) {
            case RemoteTypeId.RemoteEvent: {
                (remoteObject as RemoteEvent).OnServerEvent.Connect(connectionCallback);
                break;
            }
            case RemoteTypeId.RemoteFunction: {
                (remoteObject as RemoteFunction).OnServerInvoke = connectionCallback;
                break;
            }
        }
    }
};

function connectionCallback(player: Player, ...args: any) {
    verboseService.print("Remote called!", LOGGING_LEVEL.NORMAL);
    verboseService.print(args, LOGGING_LEVEL.NORMAL);
}

class NetworkService {
    remotes = new Map<string, RemoteInstance>();
    remotesObjects = new Map<string, RemoteType>();

    constructor() {
        verboseService.print("NetworkService initialized", LOGGING_LEVEL.DEBUG);
    }

    newRemote(name: string, typeName: RemoteTypeId): RemoteInstance {
        const fields: string[] = string.split(name, "/");
        const [category, remoteName] = [fields[0], fields[1]];
        let remoteInstance = this.remotes.get(remoteName);

        assert(category && remoteName, `Invalid remote prototype "${name}".`);

        if (remoteInstance) {
            verboseService.print(`Remote ${remoteName} already exists!`, LOGGING_LEVEL.DEBUG);
            return remoteInstance;
        }
        const remoteObject = this.remotesObjects.get(category) ?? new Instance(RemoteMap[typeName]);
        remoteInstance = new RemoteInstance(name, typeName, remoteObject)

        this.remotes.set(remoteName, remoteInstance);
        this.remotesObjects.set(category, remoteObject);
        remoteInstance.connect();
        verboseService.print(`Remote ${category}/${remoteName} created!`, LOGGING_LEVEL.DEBUG);
        return remoteInstance;
    }

    bind(name: string, func: (...args: any) => {}) {
        const fields: string[] = string.split(name, "/");
        const [category, remoteName] = [fields[0], fields[1]];

        assert(category && remoteName, `Invalid remote prototype "${name}".`);

        const remoteInstance = this.remotes.get(remoteName);
        const remoteObject = this.remotesObjects.get(category);

        remoteInstance?.bind(func);
    }
}

export const networkService = new NetworkService();
