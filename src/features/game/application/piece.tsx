import { useContext } from "react";
import { GameContext, PieceInterface } from "../domain";
import { CoreContext } from "../../core";

interface PieceProps {
  piece: PieceInterface
}

const PIECE = {
  p: '100%',
  b: '40%',
  q: '20%',
  n: '60%',
  r: '80%',
  k: '0'
}

export function Piece({ piece }: PieceProps) {
  const {turn, from, handleGrab, handleDrop} = useContext(GameContext)
  const {send} = useContext(CoreContext)

  const handleClick = () => {
    if (piece.type && piece.color === turn) handleGrab(piece.square)
    if (!piece.type || piece.color !== turn) {
      handleDrop(piece.square)
      send({type: 'MOVE', value: {from, to: piece.square}})
    }
  }

  return (
    <button
      className={
        `bg-gray-200 ${
          piece.row % 2 ? 'odd:bg-gray-500' : 'even:bg-gray-500'
        } ${
          from === piece.square ? ' sepia' : ''
        } aspect-square overflow-hidden`
      }
      onClick={handleClick}
    >
      {
        piece.type && (
          <img
            className="object-cover h-[200%]"
            src="/img/sprite.png"
            style={{
              objectPosition: PIECE[piece.type],
              marginTop: piece.color === 'b' ? '-100%' : 0,
            }}
            alt=""
          />
        )
      }
    </button>
  )
}