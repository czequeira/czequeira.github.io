import { useParams } from "react-router-dom";
import { Card } from "../../../components";
import { useContext } from "react";
import { CoreContext } from "../../core";
import { Color } from "chess.js";

export function PreGame() {
  const { opponentId } = useParams()
  const {colorSelector, setReady, send, setColorSelector, ready, opponentReady} = useContext(CoreContext)

  const changeColor = (color: Color) => {
    send({type: 'CHANGE_COLOR', value: color === 'b' ? 'w' : 'b' })
    setColorSelector(color)
  }

  const sendReady = () => {
    send({type: 'READY', value: true })
    setReady(true)
  }

  return (
    <div className="h-lvh flex justify-center items-center">
      <Card>
        <div className="flex flex-col gap-2">
          <div><b>opponent: </b>{opponentId}</div>
          <div className="flex justify-between gap-2">
            <b>color: </b>
            <fieldset className="flex gap-2">
              <div className="flex gap-1 items-center">
                <input
                  name="color"
                  type="radio"
                  id="white"
                  onChange={(e) => changeColor(e.target.checked ? 'w' : 'b')}
                  checked={colorSelector === 'w'}
                />
                <label htmlFor="white">white</label>
              </div>
              <div className="flex gap-1 items-center">
                <input
                  name="color"
                  type="radio"
                  id="black"
                  onChange={(e) => changeColor(e.target.checked ? 'b' : 'w')}
                  checked={colorSelector === 'b'}
                />
                <label htmlFor="black">black</label>
              </div>
            </fieldset>
          </div>

          <div className="flex justify-end gap-2">
            <button className="p-2 border rounded">Cancel</button>
            <button onClick={sendReady} className="p-2 border rounded">{opponentReady ? 'accept' : (ready ? 'waitting' : 'start')}</button>
          </div>
        </div>
      </Card>
    </div>
  )
}