/** @format */

import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import DashboardIcon from "@mui/icons-material/Dashboard"
import VpnLockIcon from "@mui/icons-material/VpnLock"
import AddToDriveIcon from "@mui/icons-material/AddToDrive"
import BoltIcon from "@mui/icons-material/Bolt"
import FilterListIcon from "@mui/icons-material/FilterList"
import Avatar from "@mui/material/Avatar"
import AvatarGroup from "@mui/material/AvatarGroup"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import capitalizeFirstLetter from "~/utils/formatters"

const MENU_STYLES = {
	color: "white",
	bgcolor: "transparent",
	border: "none",
	paddingX: "5px",
	borderRadius: "4px",
	"& .MuiSvgIcon-root": {
		color: "white",
	},
	"&:hover": {
		bgColor: "primary.50",
	},
}
function BoardBar({ board }) {
	return (
		<Box
			px={4}
			sx={{
				width: "100%",
				height: (theme) => theme.trello.boardBarHeight,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: 2,
				overflowX: "auto",
				bgcolor: (theme) => {
					return theme.palette.mode === "dark" ? "#34495e" : "#1976d2"
				},
				borderBottom: "1px solid white",
			}}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				<Chip
					sx={MENU_STYLES}
					icon={<DashboardIcon />}
					label={board?.title}
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<VpnLockIcon />}
					label={capitalizeFirstLetter(board?.type)}
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<AddToDriveIcon />}
					label="Add to Google Drive"
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<BoltIcon />}
					label="Automation"
					clickable
				/>
				<Chip
					sx={MENU_STYLES}
					icon={<FilterListIcon />}
					label="Filters"
					clickable
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
				}}>
				<Button
					sx={{
						borderColor: "#d3c4c4",
						color: "white",
						"&:hover": { borderColor: "white" },
					}}
					startIcon={<PersonAddIcon />}
					variant="outlined">
					Invite
				</Button>
				<AvatarGroup
					max={4}
					sx={{
						"& .MuiAvatar-root": {
							width: "34px",
							height: "34px",
							fontSize: "16px",
						},
					}}>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://plus.unsplash.com/premium_photo-1687186954188-76f7f4a3d829?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
					<Tooltip title="Avatar">
						<Avatar
							sx={{
								cursor: "pointer",
							}}
							alt="Remy Sharp"
							src="https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2lybHN8ZW58MHx8MHx8fDA%3D"
						/>
					</Tooltip>
				</AvatarGroup>
			</Box>
		</Box>
	)
}

export default BoardBar
