/** @format */
import { useState } from "react"
import { toast } from "react-toastify"
import Box from "@mui/material/Box"
import Column from "./Column/Column"
import Button from "@mui/material/Button"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { TextField } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import {
	SortableContext,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

function ListColumns({ columns, createNewColumn, createNewCard }) {
	const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
	const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
	const [newColumnTitle, setNewColumnTitle] = useState("")
	const addNewColumn = async () => {
		if (!newColumnTitle) {
			toast.error("Please enter column title", {
				position: "bottom-left",
			})
			return
		}

		const newColumnData = {
			title: newColumnTitle,
		}

		await createNewColumn(newColumnData)

		toggleOpenNewColumnForm()
		setNewColumnTitle("")
	}
	return (
		<SortableContext
			items={columns?.map(({ _id }) => _id)}
			strategy={horizontalListSortingStrategy}>
			<Box
				sx={{
					bgcolor: "inherit",
					width: "100%",
					height: "100%",
					display: "flex",
					overflowX: "auto",
					overflowY: "hidden",
				}}>
				{columns?.map((column) => (
					<Column
						sx={{
							overflowX: "hidden",
						}}
						createNewCard={createNewCard}
						column={column}
						key={column._id}
					/>
				))}
				{!openNewColumnForm ? (
					<Box
						sx={{
							minWidth: "200px",
							maxWidth: "200px",
							mx: 2,
							borderRadius: "6px",
							height: "fit-content",
							bgcolor: "#ffffff3d",
						}}>
						<Button
							onClick={toggleOpenNewColumnForm}
							sx={{
								color: "white",
								width: "100%",
								justifyContent: "flex-start",
								pl: 2.5,
								py: 1,
							}}
							startIcon={<AddBoxIcon />}>
							Add new column
						</Button>
					</Box>
				) : (
					<Box
						sx={{
							minWidth: "250px",
							maxWidth: "250px",
							mx: 2,
							p: 1,
							borderRadius: "6px",
							height: "fit-content",
							bgcolor: "#ffffff3d",
							display: "flex",
							flexDirection: "column",
							gap: 1,
						}}>
						<TextField
							sx={{
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
							label="Enter column title..."
							size="small"
							type="text"
							variant="outlined"
							autoFocus
							onChange={(e) => setNewColumnTitle(e.target.value)}
							value={newColumnTitle}
						/>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: 1,
							}}>
							<Button
								onClick={addNewColumn}
								variant="contained"
								color="success"
								sx={{
									boxShadow: "none",
									border: "0.5px solid",
									borderColor: (theme) => theme.palette.success.main,
									"&:hover": { bgcolor: (theme) => theme.palette.success.main },
								}}>
								Add Column
							</Button>
							<CloseIcon
								onClick={toggleOpenNewColumnForm}
								fontSize="small"
								sx={{
									color: "white",
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
		</SortableContext>
	)
}

export default ListColumns
