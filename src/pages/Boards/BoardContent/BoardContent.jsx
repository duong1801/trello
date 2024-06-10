/** @format */

import Box from "@mui/material/Box"
import { useEffect, useState, useCallback, useRef } from "react"
import ListColumns from "./ListColumns/ListColumns"
import { mapOrder } from "~/utils/sorts"
import Column from "./ListColumns/Column/Column"
import { generatePlaceholderCard } from "~/utils/formatters"
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
	defaultDropAnimationSideEffects,
	closestCorners,
	pointerWithin,
	getFirstCollision,
} from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import Card from "./ListColumns/Column/ListCards/Card/Card"
import { cloneDeep, isEmpty } from "lodash"

const ACTIVE_DRAG_ITEM_TYPE = {
	COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
	CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
}

function BoardContent({ board, createNewColumn, createNewCard }) {
	const mouseSensor = useSensor(MouseSensor, {
		// Require the mouse to move by 10 pixels before activating
		activationConstraint: {
			distance: 10,
		},
	})
	const touchSensor = useSensor(TouchSensor, {
		// Press delay of 250ms, with tolerance of 5px of movement
		activationConstraint: {
			delay: 250,
			tolerance: 500,
		},
	})
	const sensors = useSensors(mouseSensor, touchSensor)
	const [orderedColumns, setOrderedColumns] = useState([])
	const [activeDragItemId, setActiveDragItemId] = useState(null)
	const [activeDragItemType, setActiveDragItemType] = useState(null)
	const [activeDragItemData, setActiveDragItemData] = useState(null)
	const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
		useState(null)
	const lastOverId = useRef(null)
	const findColumnByCardId = (cardId) => {
		return orderedColumns.find((column) =>
			column?.cards?.map((card) => card._id).includes(cardId)
		)
	}

	const moveCardBetweenDifferentColumns = (
		overColumn,
		overCardId,
		active,
		over,
		activeColumn,
		activeDraggingCardId,
		activeDraggingCardData
	) => {
		setOrderedColumns((prevColumns) => {
			const overCardIndex = overColumn?.cards?.findIndex(
				(card) => card._id === overCardId
			)
			let newCardIndex

			const isBelowOverItem =
				over &&
				active.rect.current.translated &&
				active.rect.current.translated.top > over.rect.top + over.rect.height

			const modifier = isBelowOverItem ? 1 : 0

			newCardIndex =
				overCardIndex >= 0
					? overCardIndex + modifier
					: overColumn?.cards?.length + 1

			const nextColumns = cloneDeep(prevColumns)
			const nextActiveColumn = nextColumns.find(
				(column) => column._id === activeColumn._id
			)
			const nextOverColumn = nextColumns.find(
				(column) => column._id === overColumn._id
			)

			if (nextActiveColumn) {
				//
				nextActiveColumn.cards = nextActiveColumn.cards.filter(
					(card) => card._id !== activeDraggingCardId
				)

				//thêm placeholder nếu columns rỗng
				if (isEmpty(nextActiveColumn.cards)) {
					nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
				}

				nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
					(card) => card._id
				)
			}

			if (nextOverColumn) {
				//Kiểm tra xem card đang kéo có tồn tại ở overcolumn chưa. nếu có thì xoá nó trước đi
				nextOverColumn.cards = nextOverColumn.cards.filter(
					(card) => card._id !== activeDraggingCardId
				)

				nextOverColumn.cards = nextOverColumn.cards.toSpliced(
					newCardIndex,
					0,
					activeDraggingCardData
				)

				nextOverColumn.cards = nextOverColumn.cards.filter(
					(card) => !card.FE_PlaceholderCard
				)

				nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
					(card) => card._id
				)
			}

			return nextColumns
		})
	}

	const handleDragStart = (event) => {
		setActiveDragItemId(event?.active?.id)
		setActiveDragItemType(
			event?.active?.data?.current?.columnId
				? ACTIVE_DRAG_ITEM_TYPE.CARD
				: ACTIVE_DRAG_ITEM_TYPE.COLUMN
		)
		setActiveDragItemData(event?.active?.data?.current)
		if (event?.active?.data?.current?.columnId) {
			setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
		}
	}

	const handleDragOver = (event) => {
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
		const { active, over } = event
		if (!over || !active) return
		const {
			id: activeDraggingCardId,
			data: { current: activeDraggingCardData },
		} = active
		const { id: overCardId } = over

		const activeColumn = findColumnByCardId(activeDraggingCardId)
		const overColumn = findColumnByCardId(overCardId)
		if (!activeColumn || !overColumn) return
		if (activeColumn._id !== overColumn._id) {
			moveCardBetweenDifferentColumns(
				overColumn,
				overCardId,
				active,
				over,
				activeColumn,
				activeDraggingCardId,
				activeDraggingCardData
			)
		}

		if (activeColumn._id === overColumn._id) {
			//
		}
	}
	const handleDragEnd = (event) => {
		const { active, over } = event
		if (!active || !over) return
		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
			const {
				id: activeDraggingCardId,
				data: { current: activeDraggingCardData },
			} = active
			const { id: overCardId } = over

			const activeColumn = findColumnByCardId(activeDraggingCardId)
			const overColumn = findColumnByCardId(overCardId)

			if (!activeColumn || !overColumn) return

			if (oldColumnWhenDraggingCard._id !== overColumn._id) {
				moveCardBetweenDifferentColumns(
					overColumn,
					overCardId,
					active,
					over,
					activeColumn,
					activeDraggingCardId,
					activeDraggingCardData
				)
			} else {
				//
				const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex(
					({ _id }) => _id === activeDraggingCardId
				)
				const newCardIndex = oldColumnWhenDraggingCard.cards.findIndex(
					({ _id }) => _id === overCardId
				)
				const dndOrderedCards = arrayMove(
					oldColumnWhenDraggingCard.cards,
					oldCardIndex,
					newCardIndex
				)
				setOrderedColumns((prevColumns) => {
					const nextColumns = cloneDeep(prevColumns)

					const targetColumn = nextColumns.find(
						(column) => column._id === overColumn._id
					)

					targetColumn.cards = dndOrderedCards
					targetColumn.cardOrderIds = dndOrderedCards.map(({ _id }) => _id)
					return nextColumns
				})
			}
		}

		if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
			const { id: activeId } = active
			const { id: overId } = over
			if (activeId !== overId) {
				const oldColumnIndex = orderedColumns.findIndex(
					({ _id }) => _id === activeId
				)
				const newColumnIndex = orderedColumns.findIndex(
					({ _id }) => _id === overId
				)
				const dndOrderedColumns = arrayMove(
					orderedColumns,
					oldColumnIndex,
					newColumnIndex
				)
				const dndOrderedColumnsIds = dndOrderedColumns.map(({ _id }) => _id)
				setOrderedColumns(dndOrderedColumns)
			}
		}

		setActiveDragItemId(null)
		setActiveDragItemType(null)
		setActiveDragItemData(null)
		setOldColumnWhenDraggingCard(null)
	}

	useEffect(() => {
		setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"))
	}, [board])

	const dropAnimation = {
		sideEffects: defaultDropAnimationSideEffects({
			styles: {
				active: {
					opacity: "0.5",
				},
			},
		}),
	}

	const collisionDetectionStrategy = useCallback(
		(args) => {
			if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
				return closestCorners({ ...args })
			}
			const pointerIntersections = pointerWithin(args)
			if (!pointerIntersections?.length) return

			// const intersections =
			// 	pointerIntersections?.length > 0
			// 		? pointerIntersections
			// 		: rectIntersection(args)

			let overId = getFirstCollision(pointerIntersections, "id")

			if (overId) {
				const checkColumn = orderedColumns.find(
					(column) => column._id === overId
				)

				if (checkColumn) {
					overId = closestCorners({
						...args,
						droppableContainers: args.droppableContainers.filter(
							(container) =>
								container.id !== overId &&
								checkColumn?.cardOrderIds.includes(container.id)
						),
					})[0]?.id
				}
				lastOverId.current = overId
				return [{ id: overId }]
			}
			return lastOverId.current ? [{ id: lastOverId.current }] : []
		},
		[activeDragItemType, orderedColumns]
	)
	return (
		<DndContext
			sensors={sensors}
			// collisionDetection={closestCorners}
			collisionDetection={collisionDetectionStrategy}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
			onDragStart={handleDragStart}>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					height: (theme) => theme.trello.boardContentHeight,
					bgcolor: (theme) => {
						return theme.palette.mode === "dark" ? "#34495e" : "#1976d2"
					},
					p: "10px 0",
				}}>
				<ListColumns
					createNewCard={createNewCard}
					createNewColumn={createNewColumn}
					columns={orderedColumns}
				/>
				<DragOverlay dropAnimation={dropAnimation}>
					{!activeDragItemType && null}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
						<Column column={activeDragItemData} />
					)}
					{activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
						<Card card={activeDragItemData} />
					)}
				</DragOverlay>
			</Box>
		</DndContext>
	)
}

export default BoardContent
