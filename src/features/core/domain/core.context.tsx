import { Color } from "chess.js";
import Peer, { DataConnection } from "peerjs";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../game";

interface CoreContextInterface {
  id: string
  connect: (opponentId: string) => void
  colorSelector?: Color
  setColorSelector: (value: Color) => void
  send: (data: {type: string, value: unknown}) => void
  setReady: (value: boolean) => void
  ready?: boolean
  opponentReady?: boolean
}

interface CoreProviderProps {
  children: ReactNode
}

export const CoreContext = createContext<CoreContextInterface>({
  id: '',
  connect: () => {},
  send: () => {},
  setColorSelector: () => {},
  setReady: () => {},
})

export function CoreProvider({children}: CoreProviderProps) {
  const [colorSelector, setColorSelector] = useState<Color>()
  const [id, setId] = useState('')
  const [peer] = useState(new Peer())
  const navigate = useNavigate()
  const [conn, setConn] = useState<DataConnection>()
  const [ready, setReady] = useState(false)
  const [opponentReady, setOpponentReady] = useState(false)
  const {opponentMove} = useContext(GameContext)

  peer.on('open', setId)

  useEffect(() => {
    if (ready && opponentReady) navigate('/game')
  }, [ready, opponentReady])

  useEffect(() => {
    if (!conn) return;

    conn.on('open', () => {
      navigate(`${conn.peer}/init`)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conn.on('data', (data: any) => {
      if (data?.type === 'CHANGE_COLOR') setColorSelector(data?.value)
      if (data?.type === 'READY') setOpponentReady(true)
      if (data?.type === 'MOVE') opponentMove(data?.value)
    })
  }, [conn])

  peer.on('connection', setConn)

  const send = (data: {type: string, value: unknown}) => {
    conn?.send(data)
  }

  const connect = (opponentId: string) => {
    const conn = peer.connect(opponentId)
    setConn(conn)
  }

  return (
    <CoreContext.Provider value={{
      id,
      connect,
      colorSelector,
      setColorSelector,
      send,
      ready,
      setReady,
      opponentReady,
    }}>
      {children}
    </CoreContext.Provider>
  )
}