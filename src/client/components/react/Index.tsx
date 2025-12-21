import React, { useState, useEffect, useRef } from "@rbxts/react";
import { entities } from "shared/data/EntitiesData";
import { Entity, Rarity, RarityColor } from "shared/types/Entities";
import { Label } from "./Label";
import { TweenService } from "@rbxts/services";
import { BUTTON_EASING_STYLE, BUTTON_TWEEN_DURATION } from "client/config/config";
import { animateButton } from "client/Modules/UI";

const EQUIP_BUTTON_COLOR = new Color3(0, 0.98, 1);

export function Index({ collection }: { collection: string[] }) {
	const [currentEntity, setEntity] = useState<Entity>();
	const refs = useRef<ImageButton[]>([]);
	const equipRef = useRef<TextButton>();

	const setButtonRef = (button: ImageButton | undefined, index: number) => {
		if (!button) return;
		refs.current[index] = button;
	};

	useEffect(() => {
		if (!refs.current || refs.current.size() === 0) return;

		const connections: RBXScriptConnection[] = [];

		refs.current.forEach((button) => {
			const enterConn = button.MouseEnter.Connect(() => {
				const uiScale = button.FindFirstChildOfClass("UIScale");
				if (uiScale) {
					TweenService.Create(
						uiScale,
						new TweenInfo(BUTTON_TWEEN_DURATION, BUTTON_EASING_STYLE, Enum.EasingDirection.Out),
						{
							Scale: 1.1,
						},
					).Play();
				}
			});
			const leaveConn = button.MouseLeave.Connect(() => {
				const uiScale = button.FindFirstChildOfClass("UIScale");
				if (uiScale) {
					TweenService.Create(
						uiScale,
						new TweenInfo(BUTTON_TWEEN_DURATION, BUTTON_EASING_STYLE, Enum.EasingDirection.Out),
						{
							Scale: 1,
						},
					).Play();
				}
			});

			connections.push(enterConn, leaveConn);
		});

		return () => {
			connections.forEach((conn) => conn.Disconnect());
		};
	}, [refs.current.size()]);

	useEffect(() => {
		if (!equipRef || !equipRef.current) return;
		const originalSize = equipRef.current.Size;

		const animations = animateButton();
		const hoverConnection = equipRef.current.MouseEnter.Connect(() => {
			animations[0](equipRef.current as TextButton, originalSize);
		});
		const leaveConnection = equipRef.current.MouseLeave.Connect(() => {
			animations[1](equipRef.current as TextButton, originalSize);
		});

		return () => {
			hoverConnection.Disconnect();
			leaveConnection.Disconnect();
		};
	}, []);

	return (
		<>
			{/* Information frame at the right */}
			<frame
				Size={new UDim2(0.4, 0, 0.85, 0)}
				Position={new UDim2(0.58, 0, 0.98, 0)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={0.5}
				ClipsDescendants={false}
				BackgroundColor3={new Color3(0.03, 0.15, 0.49)}
			>
				<uicorner />
				<uistroke Thickness={2} />

				{/* Entity name */}
				<textlabel
					Text={currentEntity?.name ?? ""}
					Position={new UDim2(0.4, 0, 0, 0)}
					Size={new UDim2(0.6, 0, 0.1, 0)}
					BackgroundTransparency={1}
					TextScaled={true}
					TextColor3={new Color3(1, 1, 1)}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
					<uistroke Thickness={3} />
				</textlabel>

				{/* Rarity text */}
				<textlabel
					RichText={true}
					Text={(currentEntity && "<b>" + Rarity[currentEntity.rarity] + "</b>") ?? ""}
					TextColor3={currentEntity && RarityColor[currentEntity.rarity - 1]}
					Position={new UDim2(0.4, 0, 0.15, 0)}
					Size={new UDim2(0.6, 0, 0.1, 0)}
					BackgroundTransparency={1}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
					<uistroke Thickness={3} />
				</textlabel>

				{/* Description text */}
				<textlabel
					RichText={true}
					Text={(currentEntity && currentEntity.description) ?? ""}
					TextColor3={new Color3(1, 1, 1)}
					Position={new UDim2(0.5, 0, 0.35, 0)}
					Size={new UDim2(0.9, 0, 0.4, 0)}
					AnchorPoint={new Vector2(0.5, 0)}
					BackgroundTransparency={1}
					TextScaled={true}
					TextXAlignment={Enum.TextXAlignment.Left}
				>
					<uistroke Thickness={3} />
				</textlabel>

				{/* Entity icon */}
				<imagelabel
					Image={`rbxassetid://${currentEntity?.imageId}`}
					Size={new UDim2(0.35, 0, 0.3, 0)}
					BackgroundTransparency={1}
					AnchorPoint={new Vector2(0, 0)}
					Position={new UDim2(0.03, 0, 0.03, 0)}
					ImageColor3={
						currentEntity && collection.includes(currentEntity.id)
							? new Color3(1, 1, 1)
							: new Color3(0, 0, 0)
					}
				>
					<uicorner />
					<uiaspectratioconstraint />
					<uistroke Thickness={2} />
				</imagelabel>

				{/* Equip button */}
				<textbutton
					ref={equipRef}
					RichText={true}
					Text={"<b>Equip</b>"}
					TextColor3={new Color3(0, 0, 0)}
					BackgroundColor3={new Color3(1, 1, 1)}
					Position={new UDim2(0.5, 0, 0.88, 0)}
					Size={new UDim2(0.7, 0, 0.15, 0)}
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={0}
					TextScaled={true}
					Visible={currentEntity !== undefined}
				>
					<uicorner />
					<uigradient
						Rotation={90}
						Color={
							new ColorSequence([
								new ColorSequenceKeypoint(
									0,
									EQUIP_BUTTON_COLOR.Lerp(Color3.fromRGB(255, 255, 255), 0.25),
								),
								new ColorSequenceKeypoint(0.5, EQUIP_BUTTON_COLOR),
								new ColorSequenceKeypoint(
									1,
									EQUIP_BUTTON_COLOR.Lerp(Color3.fromRGB(18, 87, 191), 0.35),
								),
							])
						}
					/>
					<uistroke Thickness={3} ApplyStrokeMode={Enum.ApplyStrokeMode.Border} />
				</textbutton>
			</frame>

			{/* Container frame */}
			<scrollingframe
				AutomaticCanvasSize={"XY"}
				CanvasSize={new UDim2(0, 0, 0, 0)}
				Size={new UDim2(0.5, 0, 0.9, 0)}
				Position={new UDim2(0.02, 0, 1, 0)}
				AnchorPoint={new Vector2(0, 1)}
				BackgroundTransparency={1}
				ClipsDescendants={true}
				BorderSizePixel={0}
			>
				<uigridlayout
					CellSize={new UDim2(0.22, 0, 0.3, 0)}
					CellPadding={new UDim2(0, 10, 0, 10)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				{entities.map((entity: Entity, i) => (
					<imagebutton
						key={i}
						ref={(btn) => setButtonRef(btn, i)}
						LayoutOrder={i + 1}
						Image={`rbxassetid://${entity.imageId}`}
						BackgroundTransparency={0.3}
						BackgroundColor3={new Color3(0.15, 0.15, 0.22)}
						ImageColor3={collection.includes(entity.id) ? new Color3(1, 1, 1) : new Color3(0, 0, 0)}
						Event={{
							MouseButton1Click: () => {
								setEntity(entity);
							},
						}}
					>
						<uiscale Scale={1} />
						<uicorner />
						<uiaspectratioconstraint />
						<uistroke Thickness={2} />
						<Label
							text={"<b>" + Rarity[entity.rarity] + "</b>"}
							color={RarityColor[entity.rarity - 1]}
							position={new UDim2(0.5, 0, 1, 0)}
							anchorPoint={new Vector2(0.5, 1)}
							size={new UDim2(1, 0, 0.2, 0)}
						/>
					</imagebutton>
				))}
			</scrollingframe>
		</>
	);
}
