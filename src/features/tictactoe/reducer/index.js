import produce from 'immer'
import { DEFAULT_TURN, PLAYERS } from '../config'
import { getWinner } from './selector'

export { play, restart } from './action'
export { getGameStatus, getWinner } from './selector'

const getNextTurn = (currentTurn) => (currentTurn === 'X' ? 'O' : 'X')
const positionExist = (grid, position) => {
  return !!grid[position.x][position.y]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'played':
      const { position } = action.payload

      // check position exist
      if (positionExist(state.grid, position)) {
        return state
      }

      // check game finished
      const winner = getWinner(state.players, state.grid)
      if (winner) {
        return state
      }

      const nextState = produce(state, (draft) => {
        draft.grid[position.x][position.y] = state.turn
        draft.turn = getNextTurn(state.turn)
      })
      return nextState
    case 'restarted':
      return initialState
    default:
      return state
  }
}

export const initialState = {
  players: PLAYERS,
  turn: DEFAULT_TURN,
  grid: [
    [null, null, null], // row
    [null, null, null], // row
    [null, null, null], // row
  ],
}
