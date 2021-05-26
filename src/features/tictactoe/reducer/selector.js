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

// TODO: use enums
export const getGameStatus = (state) => {
  if (getWinner(state.players, state.grid)) {
    return 'won'
  }

  if (boardFull(state.grid)) {
    return 'draw'
  }

  return 'playing'
}
