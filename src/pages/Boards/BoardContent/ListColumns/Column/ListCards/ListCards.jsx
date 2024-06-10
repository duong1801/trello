/** @format */
import Box from "@mui/material/Box"
import Card from "./Card/Card"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
function ListCards({ cards }) {
	return (
		<SortableContext
			items={cards?.map(({ _id }) => _id)}
			strategy={verticalListSortingStrategy}>
			<Box
				sx={{
					height: "fit-content",
					maxHeight: (theme) =>
						`calc(${theme.trello.boardContentHeight} - ${
							theme.trello.columnHeaderHeight
						} - ${theme.trello.columnFooterHeight} -
						${theme.spacing(5)}
						)`,
					gap: 1,
					overflowX: "hidden",
					overflowY: "auto",
					p: "0 5px 5px 5px",
					m: "0 5px",
					display: "flex",
					flexDirection: "column",
				}}>
				{cards?.map((card) => (
					<Card card={card} key={card._id} />
				))}
			</Box>
		</SortableContext>
	)
}

export default ListCards
