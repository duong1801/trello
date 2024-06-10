/** @format */
import { useState } from "react"
import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import ContentCut from "@mui/icons-material/ContentCut"
import Divider from "@mui/material/Divider"
import ContentPaste from "@mui/icons-material/ContentPaste"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Tooltip from "@mui/material/Tooltip"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import ContentCopy from "@mui/icons-material/ContentCopy"
import AddCardIcon from "@mui/icons-material/AddCard"
import Button from "@mui/material/Button"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import ListCards from "./ListCards/ListCards"
import { mapOrder } from "~/utils/sorts"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import CloseIcon from "@mui/icons-material/Close"
import { TextField } from "@mui/material"
import { toast } from "react-toastify"

function Column({ column, createNewCard }) {
	const [openNewCardForm, setOpenNewCardForm] = useState(false)
	const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
	const [newCardTitle, setNewCardTitle] = useState("")
	const addNewCard = () => {
		if (!newCardTitle) {
			toast.error("Please enter card title", {
				position: "bottom-right",
			})
			return
		}
		const newCardData = {
			title: newCardTitle,
			columnId: column._id,
		}

		createNewCard(newCardData)

		toggleOpenNewCardForm()
		setNewCardTitle("")
	}

	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)
	const handleClick = (event) => setAnchorEl(event.currentTarget)
	const handleClose = () => setAnchorEl(null)
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column._id,
		data: { ...column },
	})

	const dndKitColumnStyle = {
		transform: CSS.Translate.toString(transform),
		transition,
		height: "100%",
		opacity: isDragging ? "0.5" : undefined,
	}
	const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, "_id")

	return (
		<div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
			<Box
				{...listeners}
				sx={{
					height: "fit-content",
					maxHeight: (theme) =>
						`calc(${theme.trello.boardContentHeight} -
						${theme.spacing(5)}
						)`,
					minWidth: "300px",
					maxWidth: "300px",
					bgcolor: (theme) => {
						return theme.palette.mode === "dark" ? "#333643" : "#ebecf0"
					},
					ml: 2,
					borderRadius: "6px",
				}}>
				{/*  Box Column Header */}
				<Box
					sx={{
						height: (theme) => theme.trello.columnHeaderHeight,
						p: 2,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Typography
						variant="h6"
						sx={{ cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>
						{column?.title}
					</Typography>
					<Box>
						<Tooltip title="More options">
							<ExpandMoreIcon
								sx={{ color: "text.primary", cursor: "pointer" }}
								id="basic-column-dropdown"
								aria-controls={open ? "basic-menu-column-dropdown" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={handleClick}
							/>
						</Tooltip>
						<Menu
							id="basic-menu-column-dropdown"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								"aria-labelledby": "basic-column-dropdown",
							}}>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<AddCardIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Add new card</ListItemText>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<ContentCut fontSize="small" />
								</ListItemIcon>
								<ListItemText>Cut</ListItemText>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<ContentCopy fontSize="small" />
								</ListItemIcon>
								<ListItemText>Copy</ListItemText>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<ContentPaste fontSize="small" />
								</ListItemIcon>
								<ListItemText>Paste</ListItemText>
							</MenuItem>
							<Divider />
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<DeleteForeverIcon fontSize="small" />
								</ListItemIcon>
								<ListItemText>Remove this column</ListItemText>
							</MenuItem>
							<MenuItem onClick={handleClose}>
								<ListItemIcon>
									<ContentPaste fontSize="small" />
								</ListItemIcon>
								<ListItemText>Archive this column</ListItemText>
							</MenuItem>
						</Menu>
					</Box>
				</Box>

				{/*  Box List Card */}
				<ListCards cards={orderedCards} />
				{/* Box Column Footter */}
				<Box
					sx={{
						height: (theme) => theme.trello.columnFooterHeight,
						p: 2,
					}}>
					{!openNewCardForm ? (
						<Box
							sx={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}>
							<Button
								onClick={toggleOpenNewCardForm}
								startIcon={<AddCardIcon />}>
								Add new card
							</Button>
							<Tooltip title="Drag to move">
								<DragHandleIcon
									sx={{
										cursor: "pointer",
									}}
								/>
							</Tooltip>
						</Box>
					) : (
						<Box
							sx={{
								height: "100%",
								display: "flex",
								alignItems: "center",
								gap: 1,
							}}>
							<TextField
								sx={{
									"& label": {
										color: "text.primary",
									},
									"& input": {
										color: (theme) => theme.palette.primary.main,
										bgcolor: (theme) =>
											theme.palette.mode === "dark" ? "#33364=3" : "white",
									},
									"& label.Mui-focused": {
										color: (theme) => theme.palette.primary.main,
									},
									"& .MuiOutlinedInput-root": {
										"& fieldset": {
											borderColor: (theme) => theme.palette.primary.main,
										},
										"&:hover fieldset": {
											borderColor: (theme) => theme.palette.primary.main,
										},
										"&.Mui-focused fieldset": {
											borderColor: (theme) => theme.palette.primary.main,
										},
									},
									"& .MuiOutlinedInput-input": {
										borderRadius: 1,
									},
								}}
								label="Enter card title..."
								size="small"
								type="text"
								variant="outlined"
								autoFocus
								onChange={(e) => setNewCardTitle(e.target.value)}
								value={newCardTitle}
							/>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
								}}>
								<Button
									onClick={addNewCard}
									variant="contained"
									color="success"
									sx={{
										boxShadow: "none",
										border: "0.5px solid",
										borderColor: (theme) => theme.palette.success.main,
										"&:hover": {
											bgcolor: (theme) => theme.palette.success.main,
										},
									}}>
									Add
								</Button>
								<CloseIcon
									onClick={toggleOpenNewCardForm}
									fontSize="small"
									sx={{
										color: (theme) => theme.palette.warning.light,
										cursor: "pointer",
										"&:hover": {
											color: (theme) => theme.palette.warning.light,
										},
									}}
								/>
							</Box>
						</Box>
					)}
				</Box>
			</Box>
		</div>
	)
}

export default Column
