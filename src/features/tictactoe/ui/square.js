import cx from 'classnames'
import { PLAYER_COLOR_CLASS } from '../config'

export const Square = ({ value, onClick }) => (
  <button
    data-testid="square"
    className={cx(
      'w-32 h-32 bg-gray-100 text-6xl flex items-center justify-center rounded-lg',
      {
        [PLAYER_COLOR_CLASS.X]: value === 'X',
        [PLAYER_COLOR_CLASS.O]: value === 'O',
      }
    )}
    onClick={onClick}
  >
    {value}
  </button>
)
