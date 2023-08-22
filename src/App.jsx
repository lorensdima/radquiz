import { useState } from "react";
import "./App.css";
import { questions1 } from "./constants";
import Choices from "./components/Choices";

function App() {
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [index, setIndex] = useState(0);
  const [questionsToAsk, setQuestionsToAsk] = useState(questions1);
  const [question, setQuestion] = useState(questions1[index]);
  const [chosen, setChosen] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [finished, setFinished] = useState(false);

  const toggleSection = () => {
    setSectionVisible(!sectionVisible);
  };

  const handleChoice = (data) => {
    setChosen(data);
    if (data != question.answer) {
      setWrongAnswers([...wrongAnswers, question]);
      setNumWrong(numWrong + 1);
    } else {
      setNumCorrect(numCorrect + 1);
    }
    setTimeout(() => {
      setChosen("");
      changeQuestion();
    }, 500);
  };

  function changeQuestion() {
    var temp = index + 1;
    if (temp != questions1.length) {
      setQuestion(questions1[temp]);
      setIndex(temp);
    } else {
      setFinished(true);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center bg-yellow-200 rounded-md p-4 mb-3">
        <div>
          <p className="text-sm text-gray-600">Correct Answers</p>
          <p className="text-2xl font-semibold text-blue-800">{numCorrect}</p>
        </div>
        <div>
          <p className="text-lg text-black font-bold">☢️ RadQuiz ☢️</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wrong Answers</p>
          <p className="text-2xl font-semibold text-red-800">{numWrong}</p>
        </div>
      </div>
      {!finished && (
        <div className="card">
          <div className="relative w-full rounded-lg bg-white p-5 resize-none text-black ">
            {chosen != "" &&
              (chosen == question.answer ? (
                <div className="absolute inset-0 bg-green-500 flex items-center justify-center rounded-lg">
                  <p className="text-white text-xl font-bold">Correct!</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-red-500 flex items-center justify-center rounded-lg">
                  <p className="text-white text-xl font-bold">
                    Wrong! Correct answer is:
                    <br />
                    <span className="text-2xl text-[#00ff00]">
                      {" "}
                      {question.answer}
                    </span>
                  </p>
                </div>
              ))}
            <p>{question.question}</p>
            <Choices
              choices={question.choices}
              answer={question.answer}
              onData={handleChoice}
            />
          </div>
        </div>
      )}

      {finished && (
        <>
          <div className="bg-gradient-to-r from-green-300 to-blue-500 rounded-t-lg shadow-lg p-6 text-white text-center">
            <div className="flex justify-center items-center mb-2">
              <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center text-blue-500 text-2xl font-semibold">
                🎉
              </div>
            </div>
            <h1 className="text-3xl font-semibold mb-4">Great Job!</h1>
            <p className="text-lg mb-2">
              You've achieved {(numCorrect / questions1.length) * 100}%
              accuracy!
            </p>
          </div>
          {(numCorrect / questions1.length) * 100 >= 80 && (
            <div className="bg-white p-3 text-black rounded-b-lg">
              <p>Message:</p>
              Ang galinggg pwede nang RRT!!! 😊{" "}
            </div>
          )}
        </>
      )}

      <button
        className="my-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={toggleSection}
      >
        {sectionVisible ? "Hide Answers" : "Show Wrong Answers"}
      </button>
      {sectionVisible && (
        <div className="rounded-sm p-5 mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Wrong Answers 🥹</h1>
          <div className="flex flex-wrap items-center">
            {wrongAnswers.map((dataItem, index) => (
              <div className="bg-white rounded-sm shadow-lg p-3 m-5 md:w-1/5">
                <p className="text-black font-semibold mb-1">
                  {dataItem.answer}
                </p>
                <p className="text-gray-600">{dataItem.question}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
