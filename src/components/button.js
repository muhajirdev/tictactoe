export const Button = ({ onClick, children }) => (
  <button className="mt-2 border px-4 py-2 rounded-lg" onClick={onClick}>
    {children}
  </button>
)
