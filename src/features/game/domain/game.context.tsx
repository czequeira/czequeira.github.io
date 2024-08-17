import { Chess, Color, Piece, PieceSymbol, Square } from "chess.js"
import { createContext, ReactNode, useEffect, useState } from "react"

function isSquare(value: string): value is Square {
  return /[a-h][1-8]/.test(value)
}

export interface MoveInterface {
  from: Square
  to: Square
  promition?: Piece
}

export interface PieceInterface {
  type?: PieceSymbol
  color?: Color
  square: Square
  row: number
  col: number
}

interface GameContextInterface {
  squares: PieceInterface[][]
  handleGrab: (from: Square) => void
  handleDrop: (to: Square) => void
  from?: Square
  turn: Color
  opponentMove: (move: MoveInterface) => void
}

export const GameContext = createContext<GameContextInterface>({
  squares: [],
  handleGrab: () => {},
  handleDrop: () => {},
  turn: 'w',
  opponentMove: () => {}
})

export function GameProvider({children}: {children: ReactNode}) {
  const [chess] = useState(new Chess())
  const [squares, setSquares] = useState<PieceInterface[][]>([])
  const [from, setFrom] = useState<Square>()
  const [turn, setTurn] = useState(chess.turn())

  const paint = () => {
    const board = chess.board().map((row, rowIndex) => row.map((col, colIndex) => {
    const square = String.fromCharCode(97 + colIndex) + `${8 - rowIndex}`
    if (!isSquare(square)) throw new Error('Ni idea');
      return { ...col, square, row: rowIndex, col: colIndex }
    }))
    setSquares(board)
    setTurn(chess.turn())
  }

  useEffect(paint, [])

  const handleGrab = (piece: Square) => {
    setFrom(piece)
  }

  const handleDrop = (piece: Square) => {
    if (!from) return;
    chess.move({from, to: piece })
    setFrom(undefined)
    paint()
  }

  const opponentMove = (move: MoveInterface) => {
    chess.move(move)
    paint()
  }

  return (
    <GameContext.Provider value={{
      handleGrab,
      squares,
      from,
      turn,
      handleDrop,
      opponentMove,
    }}>
      {children}
    </GameContext.Provider>
  )
}