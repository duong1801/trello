/** @format */

import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Card as MuiCard } from "@mui/material"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import CardActions from "@mui/material/CardActions"
import PeopleIcon from "@mui/icons-material/People"
import ModeCommentIcon from "@mui/icons-material/ModeComment"
import AttachmentIcon from "@mui/icons-material/Attachment"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
function Card({ card }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: card._id, data: { ...card } })

	const dndKitCardStyle = {
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : undefined,
		border: isDragging ? "1px solid #3867d6" : undefined,
	}
	const shouldShowCardActions = () => {
		return (
			!!card?.memberIds?.length ||
			!!card?.attachments?.length ||
			!!card?.comments?.length
		)
	}

	return (
		<MuiCard
			ref={setNodeRef}
			style={dndKitCardStyle}
			{...attributes}
			{...listeners}
			sx={{
				cursor: "pointer",
				boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
				overflow: "unset",
				display: card?.FE_PlaceholderCard ? "none" : "block",
			}}>
			{card?.cover && (
				<CardMedia sx={{ height: "140px" }} image={card?.cover} />
			)}
			<CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
				<Typography>{card.title}</Typography>
			</CardContent>
			{shouldShowCardActions() && (
				<CardActions sx={{ p: "0 4px 8px 4px" }}>
					{!!card?.memberIds?.length && (
						<Button size="small" startIcon={<PeopleIcon />} color="primary">
							{card?.memberIds?.length}
						</Button>
					)}

					{!!card?.comments?.length && (
						<Button size="small" startIcon={<ModeCommentIcon />}>
							{card?.comments?.length}
						</Button>
					)}

					{!!card?.attachments?.length && (
						<Button size="small" startIcon={<AttachmentIcon />}>
							{card?.attachments?.length}
						</Button>
					)}
				</CardActions>
			)}
		</MuiCard>
	)
}

export default Card
