export const restart = () => {
  return { type: 'restarted' }
}

export const play = ({ x, y }) => {
  const position = { x, y }
  return { type: 'played', payload: { position } }
}
