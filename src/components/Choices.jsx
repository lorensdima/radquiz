import React, { useState, useEffect } from "react";

function Choices({ onData, choices, answer }) {
  const [finalChoices, setFinalChoices] = useState([]);
  useEffect(() => {
    const array = [...choices, answer];
    const permutations = [
      [...array],
      [array[0], array[2], array[1], array[3]],
      [array[1], array[0], array[2], array[3]],
      [array[1], array[2], array[0], array[3]],
      [array[2], array[0], array[1], array[3]],
      [array[2], array[1], array[0], array[3]],
      [array[0], array[3], array[2], array[1]],
      [array[0], array[2], array[3], array[1]],
      [array[1], array[3], array[0], array[2]],
      [array[1], array[0], array[3], array[2]],
      [array[2], array[3], array[1], array[0]],
      [array[2], array[1], array[3], array[0]],
      [array[3], array[0], array[1], array[2]],
      [array[3], array[1], array[0], array[2]],
    ];
    const randomIndex = Math.floor(Math.random() * permutations.length);
    setFinalChoices(permutations[randomIndex]);
  }, [choices, answer]);

  const sendChoiceToParent = (ans) => {
    onData(ans);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-5">
      <button
        onClick={() => sendChoiceToParent(finalChoices[0])}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
      >
        {finalChoices[0]}
      </button>
      <button
        onClick={() => sendChoiceToParent(finalChoices[1])}
        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded"
      >
        {finalChoices[1]}
      </button>
      <button
        onClick={() => sendChoiceToParent(finalChoices[2])}
        className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded"
      >
        {finalChoices[2]}
      </button>
      <button
        onClick={() => sendChoiceToParent(finalChoices[3])}
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        {finalChoices[3]}
      </button>
    </div>
  );
}

export default Choices;
