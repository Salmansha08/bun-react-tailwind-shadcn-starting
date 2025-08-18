import { useState } from "react";

export const CounterFunction: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(prevState => prevState + 1);

  return (
    <div>
      <h2>Counter (Functional Component)</h2>
      <p>Nilai: {count}</p>
      <button onClick={increment}>Tambah</button>
    </div>
  );
};

