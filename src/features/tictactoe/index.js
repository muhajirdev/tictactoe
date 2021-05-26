import { initialState, reducer, getWinner, getGameStatus } from './reducer'
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

  const restart = () => {
    dispatch({ type: 'restarted' })
  }

  const play = ({ x, y }) => {
    const position = { x, y }
    dispatch({ type: 'played', payload: { position } })
  }

  let popUp
  if (status === 'won') {
    popUp = <WinPopup winner={winner} onPlayAgain={restart} />
  }
  if (status === 'draw') {
    popUp = <DrawPopup onPlayAgain={restart} />
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {popUp}
      <Turn turn={state.turn} />
      <div className="h-8"></div>
      <Board grid={state.grid} play={play} />
    </div>
  )
}
