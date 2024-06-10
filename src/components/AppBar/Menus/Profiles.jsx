/** @format */

import React from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import Divider from "@mui/material/Divider"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import ListItemIcon from "@mui/material/ListItemIcon"
import PersonAdd from "@mui/icons-material/PersonAdd"
function Profiles() {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box>
			<Tooltip title="Account settings">
				<IconButton
					onClick={handleClick}
					size="small"
					sx={{ padding: 0 }}
					aria-controls={open ? "basic-button-profiles" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}>
					<Avatar
						sx={{ width: "38px", height: "38px" }}
						alt="Girl"
						src="https://images.unsplash.com/photo-1526511253005-9a4a8cde2956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXQlMjBnaXJsfGVufDB8fDB8fHww"
					/>
				</IconButton>
			</Tooltip>
			<Menu
				id="basic-menu-profiles"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button-profiles",
				}}>
				<MenuItem onClick={handleClose}>
					<Avatar
						sx={{ width: "28px", height: "28px", mr: 2 }}
						src="https://images.unsplash.com/photo-1526511253005-9a4a8cde2956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXQlMjBnaXJsfGVufDB8fDB8fHww"
					/>{" "}
					Profile
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Avatar
						sx={{ width: "28px", height: "28px", mr: 2 }}
						src="https://images.unsplash.com/photo-1526511253005-9a4a8cde2956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXQlMjBnaXJsfGVufDB8fDB8fHww"
					/>{" "}
					My account
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<PersonAdd fontSize="small" />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</Box>
	)
}

export default Profiles
