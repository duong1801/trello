/** @format */

import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
const APP_BAR_HEIGHT = "58px"
const BOARD_BAR_HEIGHT = "60px"
const COLUMN_HEADER_HEIGHT = "50px"
const COLUMN_FOOTER_HEIGHT = "56px"
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
// Create a theme instance.
const theme = extendTheme({
	trello: {
		appBarHeight: APP_BAR_HEIGHT,
		boardBarHeight: BOARD_BAR_HEIGHT,
		boardContentHeight: BOARD_CONTENT_HEIGHT,
		columnHeaderHeight: COLUMN_HEADER_HEIGHT,
		columnFooterHeight: COLUMN_FOOTER_HEIGHT,
	},
	colorSchemes: {
		// light: {
		// 	palette: {
		// 		primary: teal,
		// 		secondary: deepPurple,
		// 	},
		// 	spacing: (factor) => `${0.25 * factor}rem`,
		// },
		// dark: {
		// 	palette: {
		// 		primary: cyan,
		// 		secondary: orange,
		// 	},
		// 	spacing: (factor) => `${0.25 * factor}rem`,
		// },
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					"*::-webkit-scrollbar": {
						width: "8px",
						height: "8px",
					},
					"*::-webkit-scrollbar-thumb": {
						backgroundColor: "#bdc3c7",
						borderRadius: "8px",
					},
					"*::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "#95a5a6",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",

					// "&:hover": {
					// 	borderWidth: "2px",
					// },
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: () => ({
					// color: theme.palette.primary.main,
					fontSize: "0.875rem",
				}),
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					"&.MuiTypography-body1": { fontSize: "0.875rem" },
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: () => {
					return {
						// color: theme.palette.primary.main,
						fontSize: "0.875rem",
						// ".MuiOutlinedInput-notchedOutline": {
						// 	borderColor: theme.palette.primary.light,
						// },
						// "&:hover": {
						// 	".MuiOutlinedInput-notchedOutline": {
						// 		borderColor: theme.palette.primary.main,
						// 	},
						// },
						"& fieldset": {
							borderWidth: "0.5px !important",
						},
						"&:hover fieldset": {
							borderWidth: "1px !important",
						},
						"&.Mui-focused fieldset": {
							borderWidth: "1px !important",
						},
					}
				},
			},
		},
	},
	// ...other properties
})
export default theme
