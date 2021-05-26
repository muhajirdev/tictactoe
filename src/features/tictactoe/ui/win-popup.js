import cx from 'classnames'
import { PLAYER_COLOR_CLASS } from '../config'
import { Popup } from '../../../components/popup'
import { Button } from '../../../components/button'

export const WinPopup = ({ winner, onPlayAgain }) => {
  return (
    <Popup>
      <div className="justify-center flex">
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/confetti-87-729044.png"
          alt="confetti icon"
        />
      </div>
      <div
        data-testid="winner"
        className={cx('text-4xl', PLAYER_COLOR_CLASS[winner])}
      >
        {winner}
      </div>
      <p className="mb-8">Just Won The Game</p>
      <Button onClick={onPlayAgain}>Play Again</Button>
    </Popup>
  )
}
