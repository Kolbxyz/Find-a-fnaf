import { Component, BaseComponent } from "@flamework/components";
import { OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { InventoryService } from "server/services/InventoryService";
import { ServerEvents } from "server/network";
import { entities } from "shared/data/EntitiesData";

interface Attributes {
	EntityId: string;
}

@Component({
	tag: "Entity",
})
export class EntityComponent extends BaseComponent<Attributes, Part> implements OnStart {
	constructor(private inventoryService: InventoryService) {
		super();
	}

	onStart() {
		this.instance.Touched.Connect((hit) => this.onTouched(hit));
	}

	private onTouched(hit: BasePart) {
		const player = Players.GetPlayerFromCharacter(hit.Parent);
		if (!player) return;

		const entityId = this.instance.GetAttribute("EntityId");
		if (!typeIs(entityId, "string")) {
			return;
		}

		const entity = entities.find((e) => e.id === entityId);
		if (!entity) {
			warn(`Entity with id ${entityId} not found`);
			return;
		}

		this.inventoryService.addToCollection(player, entity);

		ServerEvents.newEntity.fire(player, entity);

		this.instance.Destroy();
	}
}
