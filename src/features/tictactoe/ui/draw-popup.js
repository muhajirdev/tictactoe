import { Popup } from '../../../components/popup'
import { Button } from '../../../components/button'

export const DrawPopup = ({ onPlayAgain }) => {
  return (
    <Popup>
      <div className="text-4xl">Draw</div>
      <Button onClick={onPlayAgain}>Play Again</Button>
    </Popup>
  )
}
