import color from 'color'

export const primaryColor = `#333`,
	secondaryColor = `#00dd00`,
	white = `#fff`,
	primaryActiveColor = color(primaryColor)
		.lighten(0.3)
		.rgb()
		.string(),
	errorColor = `#f44336`,
	lightErrorColor = color(errorColor)
		.lighten(0.6)
		.rgb()
		.string(),
	successColor = `#00dd00`,
	lightSuccessColor = color(successColor)
		.lighten(1.2)
		.rgb()
		.string()
