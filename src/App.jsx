import { useState, useEffect } from "react";
import "./App.css";
import { questions1, questions2 } from "./constants";
import Choices from "./components/Choices";
import Settings from "./components/Settings";
import { useSpring, animated, config } from "react-spring";

function App() {
  const [settVis, setSettVis] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numWrong, setNumWrong] = useState(0);
  const [index, setIndex] = useState(0);
  const [questionsToAsk, setQuestionsToAsk] = useState(questions1);
  const [currSetName, setCurrSetName] = useState("Set 1");
  const [question, setQuestion] = useState(questionsToAsk[index]);
  const [chosen, setChosen] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [finished, setFinished] = useState(false);
  const [triggerCard, setTriggerCard] = useState(false);

  const animationProps = useSpring({
    opacity: chosen ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 100 },
  });

  function easeOutExpo(t) {
    return 1 - Math.pow(2, -10 * t);
  }

  const cardAnimProps = useSpring({
    transform: triggerCard
      ? "translateY(10px) rotate(-1deg)"
      : "translateY(0px) rotate(0deg)",
    opacity: triggerCard ? "0" : "1",
    config: {
      duration: 300, // Animation duration in milliseconds
      easing: easeOutExpo,
    },
    onRest: () => {
      // After the animation finishes, toggle the state to trigger the second animation
      if (triggerCard) {
        setTimeout(() => {
          changeQuestion();
          setTriggerCard(false);
        }, 5); // Delay of 500 milliseconds (0.5 seconds) before triggering the second animation
      }
    },
  });

  const toggleSection = () => {
    setSectionVisible(!sectionVisible);
  };

  const toggleSettings = (data) => {
    setSettVis(data);
  };

  const closeSettings = (data) => {
    setSettVis(false);
    changeQuestionToAsk(data);
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
      setTriggerCard(true);
    }, 600);
  };

  function changeQuestionToAsk(setName) {
    if (currSetName != setName) {
      switch (setName) {
        case "Set 1":
          setQuestionsToAsk(questions1);
          setQuestion(questions1[0]);
          break;
        case "Set 2":
          setQuestionsToAsk(questions2);
          setQuestion(questions2[0]);
          break;
        default:
          setQuestionsToAsk(questions1);
      }
      setCurrSetName(setName);
      setIndex(0);
      setNumWrong(0);
      setNumCorrect(0);
      setFinished(false);
      setWrongAnswers([]);
    }
  }

  function changeQuestion() {
    var temp = index + 1;
    if (temp != questionsToAsk.length) {
      setQuestion(questionsToAsk[temp]);
      setIndex(temp);
    } else {
      setFinished(true);
    }
  }

  return (
    <>
      {settVis && (
        <Settings
          toggle={closeSettings}
          currSetName={currSetName}
          currNumItems={questionsToAsk.length}
        />
      )}
      <div
        className="bg-yellow-100 text-gray-600 justify-center w-10 md:w-1/6 rounded-t-lg ml-3 pt-2 cursor-pointer"
        onClick={toggleSettings}
      >
        ⚙️ <span className="invisible md:visible">Settings </span>
      </div>

      <div className="flex justify-between items-center bg-yellow-200 rounded-md p-4 mb-3">
        <div>
          <p className="text-sm text-gray-600">Correct Answers</p>
          <p className="text-2xl font-semibold text-blue-800">{numCorrect}</p>
        </div>
        <div>
          <p className="text-lg text-black font-bold">RadQuiz ☢️</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Wrong Answers</p>
          <p className="text-2xl font-semibold text-red-800">{numWrong}</p>
        </div>
      </div>
      {!finished && (
        <div className="card h-full">
          <animated.div
            style={cardAnimProps}
            className="relative rounded-lg bg-white p-5 resize-none text-black top-0 left-0 w-full"
          >
            <div className="absolute inset-x-0 mx-auto top-[-2.1rem]">
              <div className="bg-white w-20 h-12 flex items-center justify-center rounded-lg">
                <span className="text-black">
                  {index + 1}/{questionsToAsk.length}
                </span>
              </div>
            </div>

            {chosen != "" && (
              <animated.div
                style={animationProps}
                className={`absolute inset-0 z-20 ${
                  chosen === question.answer ? "bg-green-500" : "bg-red-500"
                } flex items-center justify-center rounded-lg`}
              >
                <p className="text-white text-xl font-bold">
                  {chosen === question.answer
                    ? "Correct!"
                    : "Wrong! Correct answer is:"}
                  <br />
                  <span className="text-2xl text-[#00ff00]">
                    {" "}
                    {question.answer}
                  </span>
                </p>
              </animated.div>
            )}
            <p>{question.question}</p>
            <Choices
              choices={question.choices}
              answer={question.answer}
              onData={handleChoice}
            />
          </animated.div>
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
              You've achieved {(numCorrect / questionsToAsk.length) * 100}%
              accuracy!
            </p>
          </div>
          {(numCorrect / questionsToAsk.length) * 100 >= 80 && (
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
          {wrongAnswers.length == 0 && (
            <p>No wrong answers so far. Good Job!</p>
          )}
          <div className="flex flex-wrap items-center">
            {wrongAnswers.map((dataItem, index) => (
              <div className="relative bg-white rounded-sm shadow-lg p-3 m-5 w-full md:w-1/5">
                <p className="text-black font-semibold mb-1">
                  {dataItem.answer}
                </p>
                <p className="text-gray-600">{dataItem.question}</p>
                <div class="absolute left-2 right-0 top-[-20px] bg-blue-500 rounded-full w-1/5 text-white text-center">
                  <span class="text-1xl font-bold">{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <footer class="text-white py-4 bottom-0">
        <div class="container mx-auto flex items-center justify-center">
          <p class="text-sm">
            Made with <span class="text-red-500">&hearts;</span>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
