import produce from 'immer'
import { DEFAULT_TURN, PLAYERS } from './config'
import { allSame, transpose } from './utils'

const checkHorizontalWin = (player, grid) => {
  const wins = grid.map((row) => allSame(row, player))
  return wins.includes(true)
}

const checkVerticalWin = (player, grid) => {
  const transposedGrid = transpose(grid)

  const wins = transposedGrid.map((row) => allSame(row, player))
  return wins.includes(true)
}

const checkDiagonalWin = (player, grid) => {
  const diagonal1 = [grid[0][0], grid[1][1], grid[2][2]]
  const diagonal2 = [grid[0][2], grid[1][1], grid[2][0]]

  return allSame(diagonal1, player) || allSame(diagonal2, player)
}

const checkWin = (player, grid) => {
  return (
    checkHorizontalWin(player, grid) ||
    checkVerticalWin(player, grid) ||
    checkDiagonalWin(player, grid)
  )
}

const boardFull = (grid) => {
  let foundNull = false

  // by default the boards is filled with null,
  // so if there's no null anymore. it's full
  grid.forEach((row) => {
    if (row.includes(null)) {
      foundNull = true
    }
  })

  return !foundNull
}

export const getGameStatus = (state) => {
  if (getWinner(state.players, state.grid)) {
    return 'won'
  }

  if (boardFull(state.grid)) {
    return 'draw'
  }

  return 'playing'
}

export const getWinner = (players, grid) => {
  const wins = players.map((player) => {
    return {
      player,
      win: checkWin(player, grid),
    }
  })

  const win = wins.find((x) => x.win === true)
  if (!win) return null
  return win.player
}

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
