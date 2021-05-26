export const Popup = ({ children }) => {
  return (
    <div className="absolute text-lg font-bold h-screen w-full flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg px-4 py-8 w-full max-w-md">{children}</div>
    </div>
  )
}
