export const transpose = (matrix) => {
  let [row] = matrix
  return row.map((value, column) => matrix.map((row) => row[column]))
}

export const allSame = (items, char) => {
  return items.reduce((prev, current) => {
    const currentMatch = char === current
    return prev && currentMatch
  }, true)
}
