// src/server/services/NetworkService.ts
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

class RemoteInstance {
    name: string;
    type: RemoteTypeId;
    object: RemoteType;

    constructor(name: string, typeName: RemoteTypeId) {
        this.name = name;
        this.type = typeName;

        this.object = new Instance(RemoteMap[typeName]);
        this.object.Name = name;
    }

};

class NetworkService {
    remotes = new Map<string, RemoteInstance>();

    constructor() {
        print("NetworkService initialized");
    }

    newRemote(name: string, typeName: RemoteTypeId): RemoteType {
        let remoteInstance = this.remotes.get(name);

        if (remoteInstance) {
            print(`Remote ${name} already exists!`)
            return remoteInstance.object
        }
        remoteInstance = new RemoteInstance(name, typeName)
        this.remotes.set(name, remoteInstance);
        print(`Remote ${name} created!`)
        return remoteInstance.object;
    }
}

export const networkService = new NetworkService();
