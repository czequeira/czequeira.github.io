import { Card } from "../../../components";
import { useContext } from "react";
import { GameContext } from "../domain";
import { CoreContext } from "../../core";
import { Piece } from "./piece";

export function Game() {
  const {squares} = useContext(GameContext)
  const {colorSelector} = useContext(CoreContext)

  const board = colorSelector === 'w' ?
    squares :
    [...squares].reverse().map(i => [...i].reverse()) 

  return (
    <div className="h-lvh flex justify-center items-center">
      <Card>
        <div className="flex flex-col max-w-xl">
          {
            board.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid group grid-cols-8`}
              >
                {
                  row.map((i, index) => (
                    <Piece key={index} piece={{...i, row: rowIndex, col: index}} />
                  ))
                }
              </div>
            ))
          }
        </div>
      </Card>
    </div>
  )
}