"use client";
import React, { useState, useEffect } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CalculateNextWarmDay = ({ data }) => {
  const [input, setInput] = useState(data);
  const [monoStack, setMonoStack] = useState([]);
  const [result, setResult] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const calculateNextSunnyDay = async () => {
    setIsRunning(true); // Disable button when the algorithm is running
    let localMonoStack = []; // Local stack to manage the current state
    let localResult = new Array(input.length).fill(0); // Local result array initialized to 0s

    for (let i = 0; i < input.length; i++) {

      // While the stack is not empty and the current temperature is higher than the top element of the stack
      while (
        localMonoStack.length > 0 &&
        input[localMonoStack[localMonoStack.length - 1]] < input[i]
      ) {
        let index = localMonoStack.pop(); // Pop the top of the stack
        localResult[index] = i - index; // Calculate the difference between the current index and the popped index
        await sleep(2000); // Wait to simulate delay in visualization
      }

      // Push the current index to the stack
      localMonoStack.push(i);
      

      // Update state with the local variables to trigger a re-render
      setMonoStack([...localMonoStack]);
      setResult([...localResult]);

      await sleep(2000); // Simulate delay to step through the process
    }
    setIsRunning(false); // Re-enable the button after the calculation finishes
  };

  // UseEffect to log the result after it changes
  useEffect(() => {
    console.log("Updated monoStack:", monoStack);
    console.log("Updated result:", result);
  }, [monoStack, result]); // This will run every time `monoStack` or `result` changes

  return (
    <div>
      <button
        onClick={calculateNextSunnyDay}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 bg-indigo-500 p-3 rounded-md hover:bg-indigo-800 max-h-20 place-content-center"
      >
        Run Algorithm
      </button>
      <div className="flex">
        <div className="mr-32 border p-16 flex flex-col">
          <div className="text-6xl items-center justify-items-center p-4 flex flex-col-reverse">
            {monoStack.map((value, index) => (
              <p
                key={index}
                className={index == monoStack.length - 1 ? "text-red-600" : ""}
              >
                {value}
              </p>
            ))}
          </div>
          <h3 className="text-4xl pr-4">Monotonic Stack</h3>
        </div>
        <div className="border p-8 flex flex-col rounded-md border-white">
          <div className="border p-8 flex flex rounded-md border-white">
            <h3 className="text-4xl pr-4">Input Array:</h3>
            {input.map((temp, index) => (
              <h1 key={index} className="text-4xl p-1">
                {temp}
                {index < input.length - 1 ? "," : ""}
              </h1>
            ))}
          </div>
          <div className="border p-8 mt-10 flex flex rounded-md border-white">
            <h3 className="text-4xl pr-4">Output Array:</h3>
            {result.map((temp, index) => (
              <h1 className="text-4xl p-1">
                {temp}
                {index < result.length - 1 ? "," : ""}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateNextWarmDay;
