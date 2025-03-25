import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={() => setCount(count + 1)}
      >
        Increase
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 ml-2"
        onClick={() => setCount(count - 1)}
      >
        Decrease
      </button>
    </div>
  );
};

export default Counter;
