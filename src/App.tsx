import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { createBoard } from './utils/createBoard'
import { moveBelow, updateBoard } from './store'
import Board from './components/Board'
import { formulaForColumnOfFour, formulaForColumnOfThree, generateInvalidMoves } from './utils/formula'
import { checkForRowOfFour, checkForRowOfThree, isColumnOfFour, isColumnOfThree } from './utils/moveLogic'

function App() {
  const dispatch = useAppDispatch()

  const board = useAppSelector(({candyCrush: {board}}) => board)
  const boardSize = useAppSelector(({candyCrush: {boardSize}}) => boardSize)

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)))
  }, [dispatch, boardSize])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize));
      checkForRowOfFour(newBoard, boardSize,generateInvalidMoves(boardSize, true))
      isColumnOfThree(newBoard, boardSize, formulaForColumnOfThree(boardSize));
      checkForRowOfThree(newBoard, boardSize,generateInvalidMoves(boardSize, ))
      dispatch(updateBoard(newBoard))
      dispatch(moveBelow())
    }, 150)
    return () => clearInterval(timeout)
  },[board, boardSize, dispatch])
  

  return (
    <div className="flex justify-center items-center h-screen">
      <Board/>
    </div>

  )
}

export default App
