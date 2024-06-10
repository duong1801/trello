/** @format */
import { useState } from "react"
import Box from "@mui/material/Box"
import ModeSelect from "~/components/ModeSelect/ModeSelect"
import AppsIcon from "@mui/icons-material/Apps"
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg"
import SvgIcon from "@mui/material/SvgIcon"
import Typography from "@mui/material/Typography"
import Workspaces from "./Menus/Workspaces"
import Recent from "./Menus/Recent"
import Starred from "./Menus/Starred"
import Templates from "./Menus/Templates"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Badge from "@mui/material/Badge"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import Tooltip from "@mui/material/Tooltip"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import Profiles from "./Menus/Profiles"
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos"
import InputAdornment from "@mui/material/InputAdornment"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
function AppBar() {
	const [searchValue, setValue] = useState("")
	return (
		<Box
			px={4}
			sx={{
				width: "100%",
				height: (theme) => theme.trello.appBarHeight,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
				overflowX: "auto",
				bgcolor: (theme) => {
					return theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0"
				},
			}}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<AppsIcon sx={{ color: "white" }} />
				<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
					<SvgIcon
						fontSize="small"
						component={TrelloIcon}
						inheritViewBox
						sx={{ color: "white" }}
					/>
					<Typography
						sx={{
							fontSize: "1.2rem",
							fontWeight: "bold",
							color: "white",
						}}>
						Trello
					</Typography>
				</Box>

				<Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
					<Workspaces />
					<Recent />
					<Starred />
					<Templates />
					<Button
						variant="outlined"
						sx={{
							color: "white",
							border: "none",
							"&:hover": {
								border: "none",
							},
						}}
						startIcon={<AddToPhotosIcon />}>
						Create
					</Button>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 4,
				}}>
				<TextField
					sx={{
						minWidth: "120px",
						maxWidth: "180px",
						"& label": {
							color: "white",
						},
						"& input": {
							color: "white",
						},
						"& label.Mui-focused": {
							color: "white",
						},
						"& .MuiOutlinedInput-root": {
							"& fieldset": {
								borderColor: "#dbd8d8",
							},
							"&:hover fieldset": {
								borderColor: "white",
							},
							"&.Mui-focused fieldset": {
								borderColor: "white",
							},
						},
					}}
					id="outlined-search"
					label="Search..."
					size="small"
					type="text"
					onChange={(e) => setValue(e.target.value)}
					value={searchValue}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon
									sx={{
										color: "white",
									}}
								/>
							</InputAdornment>
						),
						endAdornment: (
							<CloseIcon
								onClick={() => setValue("")}
								fontSize="small"
								sx={{
									color: "white",
									cursor: "pointer",
									display: searchValue ? "block" : "none",
								}}
							/>
						),
					}}
				/>
				<ModeSelect />
				<Tooltip title="Notification">
					<Badge color="warning" variant="dot" sx={{ cursor: "pointer" }}>
						<NotificationsNoneIcon sx={{ color: "white" }} />
					</Badge>
				</Tooltip>
				<Tooltip sx={{ cursor: "pointer" }} title="Help">
					<HelpOutlineIcon sx={{ color: "white" }} />
				</Tooltip>
				<Profiles />
			</Box>
		</Box>
	)
}

export default AppBar
