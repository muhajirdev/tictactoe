import cx from 'classnames'
import { PLAYER_COLOR_CLASS } from '../config'

export const Turn = ({ turn }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        data-testid="turn-element"
        className={cx(
          'rounded-full border text-5xl h-20 w-20 flex items-center justify-center font-bold',
          PLAYER_COLOR_CLASS[turn]
        )}
      >
        {turn}
      </div>
      <div>It's your turn</div>
    </div>
  )
}
