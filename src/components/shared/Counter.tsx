import { useState } from "react";

export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Counter</h1>
            <p className="text-lg">Current Count: {count}</p>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300" onClick={decrement}>-</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={increment}>+</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
};