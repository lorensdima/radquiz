import React, { useState, useEffect } from "react";

function Settings(props) {
  const [dropVisible, setDropVisible] = useState(false);
  const [choice, setChoice] = useState(props.currSetName);
  const toggleDrop = () => {
    setDropVisible(!dropVisible);
  };

  const close = () => {
    props.toggle(choice);
  };

  const chosen = (choice) => {
    setChoice(choice);
    setDropVisible(!dropVisible);
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
            <p> Set Name: {props.currSetName} </p>
            <p> Total Items: {props.currNumItems} items</p>
          </div>
          <p className="font-bold"> Select Test Set: </p>
          <div className="mt-1 ml-3">
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-white hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 active:bg-gray-900 transition duration-150 ease-in-out"
              onClick={toggleDrop}
            >
              {choice}
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
                  onClick={() => chosen("Set 1")}
                >
                  Set 1
                </a>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => chosen("Set 2")}
                >
                  Set 2
                </a>
              </div>
            </div>
          )}
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded absolute right-0 mr-6 bottom-0 mb-6"
          onClick={() => close()}
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
