import { TweenService } from "@rbxts/services";
import { BUTTON_TWEEN_DURATION, BUTTON_EASING_STYLE } from "client/config/config";

const mouseEnter = (guiObject: GuiObject, originalSize: UDim2) => {
	const scaleFactor = 1.1;
	const tween = TweenService.Create(
		guiObject,
		new TweenInfo(BUTTON_TWEEN_DURATION, BUTTON_EASING_STYLE, Enum.EasingDirection.Out),
		{
			Size: new UDim2(
				originalSize.X.Scale * scaleFactor,
				originalSize.X.Offset,
				originalSize.Y.Scale * scaleFactor,
				originalSize.Y.Offset,
			),
		},
	);

	tween.Play();
};

const mouseLeave = (guiObject: GuiObject, originalSize: UDim2) => {
	const shrink = TweenService.Create(
		guiObject,
		new TweenInfo(BUTTON_TWEEN_DURATION, BUTTON_EASING_STYLE, Enum.EasingDirection.Out),
		{
			Size: originalSize,
		},
	);
	shrink.Play();
};

export const animateButton = () => {
	return [mouseEnter, mouseLeave];
};
