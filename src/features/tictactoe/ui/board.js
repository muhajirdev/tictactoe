import { Square } from './square'

export const Board = ({ grid, play }) => {
  return (
    <div>
      {grid.map((row, x) => (
        <div className="flex space-x-8 py-4" key={x}>
          {row.map((item, y) => (
            <Square value={item} onClick={() => play({ x, y })} key={y} />
          ))}
        </div>
      ))}
    </div>
  )
}
