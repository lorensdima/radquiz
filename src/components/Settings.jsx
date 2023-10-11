import React, { useState, useEffect } from "react";

function Settings(props) {
  const [indexChosen, setIndexChosen] = useState(0);
  const [currIndex, setCurrIndex] = useState(0);
  const [dropVisible, setDropVisible] = useState(false);
  const [error, setError] = useState("");
  const [choice, setChoice] = useState(props.currSetName);
  const toggleDrop = () => {
    setDropVisible(!dropVisible);
  };

  const close = () => {
    props.toggle();
  };

  const update = () => {
    props.update({ set: choice, index: Number(currIndex) });
  };

  const chosen = (choice) => {
    setIndexChosen(0);
    setChoice(choice);
    setDropVisible(!dropVisible);
  };

  const handleInputChange = () => {
    setError("");
    if (/^(0|[1-9]\d*)$/.test(indexChosen)) {
      const temp = Number(indexChosen);
      if (temp > props.dataset[choice].length - 1) {
        setCurrIndex(props.dataset[choice].length - 1);
      } else if (temp <= 0) {
        setCurrIndex(0);
      } else {
        setCurrIndex(indexChosen - 1);
      }
    } else {
      setError("Error please enter valid item number");
    }
  };

  return (
    <div
      class="absolute flex items-center justify-center inset-0 z-10 h-full"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className="relative bg-white text-black p-5 md:p-10 text-left shadow-lg rounded-lg w-full mx-10 md:w-1/2">
        <h1 className="font-bold text-xl mb-5"> Settings </h1>
        <div className="relative inline-block mb-10">
          <div className=" mb-5">
            <h1 className="font-bold"> Current Set Details: </h1>
            <p> Set Name: Set {props.currSetName + 1} </p>
            <p> Total Items: {props.currNumItems} items</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t pt-2">
            <div>
              <p className="font-bold"> Select Test Set: </p>
              <div className="mt-1 ml-3">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-white hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 active:bg-gray-900 transition duration-150 ease-in-out"
                  onClick={toggleDrop}
                >
                  Set {choice + 1}
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.293 14.293a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3z" />
                  </svg>
                </button>
              </div>
              {dropVisible && (
                <div className="z-10 origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => chosen(0)}
                    >
                      Set 1
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => chosen(1)}
                    >
                      Set 2
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => chosen(2)}
                    >
                      Set 3
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <p> Total Items: {props.dataset[choice].length} items</p>
              <div></div>
            </div>
          </div>
          <div className="mt-2">
            <div className="grid grid-cols-2 pt-2">
              <div>
                <label className="text-sm font-bold">
                  Select Starting Number:
                </label>
                <input
                  type="number"
                  className="block w-full py-2 px-3 text-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter a number"
                  onChange={(e) => setIndexChosen(e.target.value)}
                  value={indexChosen}
                />
              </div>
              <div className="p-5">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded right-0 mr-6 bottom-0 mb-6"
                  onClick={handleInputChange}
                >
                  Set Item Number
                </button>
              </div>
            </div>
            {error != "" && <p className="text-red-500">{error}</p>}
            <p className="font-semibold">Item #{currIndex + 1} </p>
            <p className="my-3 w-full text-wrap">
              Question: {props.dataset[choice][currIndex].question}
            </p>
          </div>
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded absolute right-0 mr-6 bottom-0 mb-6"
          onClick={() => update()}
        >
          Save
        </button>
        <div
          className="absolute top-0 right-0 mr-10 mt-8 font-bold cursor-pointer"
          onClick={() => close()}
        >
          X
        </div>
      </div>
    </div>
  );
}

export default Settings;
