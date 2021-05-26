import {
  initialState,
  reducer,
  play,
  restart,
  getGameStatus,
  getWinner,
} from './reducer/index'

import { useReducer } from 'react'
import { WinPopup } from './ui/win-popup'
import { Board } from './ui/board'
import { DrawPopup } from './ui/draw-popup'
import { Turn } from './ui/turn'

export const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // When the component gets bigger, put useMemo or useSelector / createSelector redux
  const winner = getWinner(state.players, state.grid)
  const status = getGameStatus(state)

  let popUp
  if (status === 'won') {
    popUp = <WinPopup winner={winner} onPlayAgain={() => dispatch(restart())} />
  }
  if (status === 'draw') {
    popUp = <DrawPopup onPlayAgain={() => dispatch(restart())} />
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {popUp}
      <Turn turn={state.turn} />
      <div className="h-8"></div>
      <Board grid={state.grid} play={(position) => dispatch(play(position))} />
    </div>
  )
}
