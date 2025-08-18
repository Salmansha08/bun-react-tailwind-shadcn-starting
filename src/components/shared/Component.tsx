export const Component = ({
  name,
  increment,
  reset
}: {
  name: string,
  increment: () => void,
  reset: () => void
}) => {
  return (
    <>
      <div className="text-2xl font-bold text-red-500">
        Component {name}
      </div>
      <button
        className="bg-blue-500"
        onClick={increment}
      >
        Increment
      </button>
      <button
        className="bg-red-500"
        onClick={reset}
      >
        RESET
      </button>
    </>
  )
}
