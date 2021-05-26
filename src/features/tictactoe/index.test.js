import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

test('renders learn react link', () => {
  render(<App />)
  // x is default `turn`
  const turnElement = screen.getByTestId('turn-element')
  expect(turnElement).toHaveTextContent('X')
})

test('all squares should be empty', () => {
  render(<App />)

  const squares = screen.getAllByTestId('square')

  expect(squares[0]).toBeEmptyDOMElement()
  expect(squares[1]).toBeEmptyDOMElement()
  expect(squares[2]).toBeEmptyDOMElement()
  expect(squares[3]).toBeEmptyDOMElement()
  expect(squares[4]).toBeEmptyDOMElement()
  expect(squares[5]).toBeEmptyDOMElement()
  expect(squares[6]).toBeEmptyDOMElement()
  expect(squares[7]).toBeEmptyDOMElement()
  expect(squares[8]).toBeEmptyDOMElement()

  expect(squares.length).toBe(9)
})

test('players should be able to play', () => {
  render(<App />)

  const squares = screen.getAllByTestId('square')

  const firstSquare = squares[0]
  expect(firstSquare).toBeEmptyDOMElement()
  userEvent.click(firstSquare)
  expect(firstSquare).toHaveTextContent('X')

  const secondSquare = squares[1]
  expect(secondSquare).toBeEmptyDOMElement()
  userEvent.click(secondSquare)
  expect(secondSquare).toHaveTextContent('O')
})

test('should not able to play on filled square', () => {
  render(<App />)

  const squares = screen.getAllByTestId('square')

  const firstSquare = squares[0]
  expect(firstSquare).toBeEmptyDOMElement()
  userEvent.click(firstSquare)
  expect(firstSquare).toHaveTextContent('X')

  userEvent.click(firstSquare)
  expect(firstSquare).toHaveTextContent('X')

  const turn = screen.getByTestId('turn-element')
  expect(turn).toHaveTextContent('O') // still O's turn
})

test('X should win the game with (vertical)', () => {
  render(<App />)

  const squares = screen.getAllByTestId('square')

  // 0 1 2
  // 3 4 5
  // 6 7 8

  // X 0 _
  // X 0 _
  // X _ _

  userEvent.click(squares[0])
  userEvent.click(squares[1])
  userEvent.click(squares[3])
  userEvent.click(squares[4])
  userEvent.click(squares[6])

  expect(screen.getByText(/Just won the game/i)).toBeInTheDocument()
  expect(screen.getByTestId('winner')).toHaveTextContent('X')
})

test('X should win the game with (horizontal)', () => {
  render(<App />)

  const squares = screen.getAllByTestId('square')

  // 0 1 2
  // 3 4 5
  // 6 7 8

  // X X X
  // O 0 _
  // _ _ _

  userEvent.click(squares[0])
  userEvent.click(squares[3])
  userEvent.click(squares[1])
  userEvent.click(squares[4])
  userEvent.click(squares[2])

  expect(screen.getByText(/Just won the game/i)).toBeInTheDocument()
  expect(screen.getByTestId('winner')).toHaveTextContent('X')
})
