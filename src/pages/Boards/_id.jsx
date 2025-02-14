/** @format */

//Boards detail
import { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
import { generatePlaceholderCard } from "~/utils/formatters"
import { isEmpty } from "lodash"
import {
	fetchBoardDetailsAPI,
	createNewColumnAPI,
	createNewCardAPI,
} from "~/apis"
import { mockData } from "~/apis/mock-data"
import { create } from "lodash"
function Board() {
	const [board, setBoard] = useState(null)

	useEffect(() => {
		setBoard(mockData?.board)
		// const boadId = "663499677e07a5172512e112"
		// // fetchBoardDetailsAPI(boadId)
		// fetchBoardDetailsAPI(boadId).then((board) => {
		// 	board.columns.forEach((column) => {
		// 		if (isEmpty(column.cards)) {
		// 			column.cards = [generatePlaceholderCard(column)]
		// 			column.cardOrderIds = [generatePlaceholderCard(column)._id]
		// 		}
		// 	})
		// 	setBoard(board)
		// })
	}, [])

	const createNewColumn = async (newColumnData) => {
		const createdColumn = await createNewColumnAPI({
			...newColumnData,
			boardId: board._id,
		})

		createdColumn.cards = [generatePlaceholderCard(createdColumn)]
		createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

		const newBoard = { ...board }
		newBoard.columns.push(createdColumn)
		newBoard.columnOrderIds.push(createdColumn._id)
		setBoard(newBoard)
	}

	const createNewCard = async (newCardData) => {
		const createdCard = await createNewCardAPI({
			...newCardData,
			boardId: board._id,
		})
		const newBoard = { ...board }
		const columnToUpdate = newBoard.columns.find(
			(column) => column._id === createdCard.columnId
		)

		if (columnToUpdate) {
			columnToUpdate.cards.push(createdCard)

			columnToUpdate.cardOrderIds.push(createdCard._id)
		}

		// cardOrderIds
		setBoard(newBoard)
	}
	return (
		<Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
			<AppBar />
			<BoardBar board={board} />
			<BoardContent
				board={board}
				createNewColumn={createNewColumn}
				createNewCard={createNewCard}
			/>
		</Container>
	)
}

export default Board
