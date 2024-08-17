import { Chess, Color, PieceSymbol, Square } from "chess.js"
import Peer, { DataConnection } from "peerjs"
import { useEffect, useState } from "react"

function isSquare(value: string): value is Square {
  return /[a-h][1-8]/.test(value)
}

const PIECE = {
  p: '100%',
  b: '40%',
  q: '20%',
  n: '60%',
  r: '80%',
  k: '0'
}

interface PieceInterface {
  type: PieceSymbol
  color: Color
  square: Square
}

export function App() {
  const [pieces, setPieces] = useState<(PieceInterface | null)[][]>([[]])
  const [from, setFrom] = useState<Square>()
  const [to, setTo] = useState<Square>()
  const [chess] = useState(new Chess())
  const [startMove, setStartMove] = useState(true)
  const [moves, setMoves] = useState<string[]>([])
  const [peer] = useState(new Peer())
  const [oid, setOid] = useState('')
  const [conn, setConn] = useState<DataConnection>()

  const selectSquare = (row: number, col: number) => {
    const s = String.fromCharCode(97 + col) + `${8 - row}`
    if (!isSquare(s)) return;
    if (pieces[row][col]?.color === chess.turn()) {
      setFrom(s)
      setTo(undefined)
      setStartMove(false)
    }
    if (startMove) return;
    if (!pieces[row][col]?.color || pieces[row][col]?.color !== chess.turn()) {
      setTo(s)
      setStartMove(true)
    }
  }

  useEffect(() => {
    if (!from || !to) return;
    try {
      chess.move({ from, to })
      setPieces(chess.board())
      conn?.send({ from, to })
      setFrom(undefined)
    } catch (error) {
      alert(error)
    }
  }, [to])

  useEffect(() => {
    if (!from) setMoves([]);
    else setMoves(
      chess
        .moves({ square: from })
        .map(i => i.substring(i.length - 2))
    )
    console.log(peer.id)
  }, [from])

  const reset = () => {
    chess.reset()
    conn?.send('RESET')
  }

  useEffect(() => {
    setPieces(chess.board())
    peer.on('connection', (conn) => {
      setConn(conn)
    })
  }, [])

  useEffect(() => {
    if (!conn) return;
    conn.on('data', (data: any) => {
      if (isSquare(data?.from) && isSquare(data?.to)) {
        setFrom(data.from)
        setTo(data.to)
      }
      if (data === 'RESET') chess.reset()
    })
  }, [conn])

  return (
    <>
      <div className="flex flex-col max-w-xl">
        {
          pieces.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`grid group grid-cols-8`}
            >
              {
                row.map((i, index) => (
                  <button
                    key={index}
                    className={
                      `${rowIndex % 2 ? 'odd:bg-gray-500' : 'even:bg-gray-500'
                      } ${(from && i?.square === from) ? ' ring ring-gray-700 ' : (
                        moves.includes(String.fromCharCode(97 + index) + `${8 - rowIndex}`) ?
                          ' ring ring-red-400 ' : ''
                      )
                      } aspect-square overflow-hidden`
                    }
                    onClick={() => selectSquare(rowIndex, index)}
                  >
                    {
                      i && (
                        <img
                          className="object-cover h-[200%]"
                          src="/img/sprite.png"
                          style={{
                            objectPosition: PIECE[i.type],
                            marginTop: i.color === 'b' ? '-100%' : 0,
                          }}
                          alt=""
                        />
                      )
                    }
                  </button>
                ))
              }
            </div>
          ))
        }
      </div>

      <div>
        <input type="text" value={oid} onChange={e => setOid(e.target.value)} />
        <button onClick={() => {
          const conn = peer.connect(oid)
          setConn(conn)
        }}>connect</button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  )
}