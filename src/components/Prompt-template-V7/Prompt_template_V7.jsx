import React from "react";

import "./Prompt_template_V7.css";
import rightArrow from "../../assets/images/gray-arrow/right-arrow.png";
import greenTick from "../../assets/images/new-green-tick/Path 225.png";

import jsonData from "./jsonData_V7";

// Make sure to convert strings to array with split()
// const objArr = {
//   Prompt: ["_", "falam"],
//   Prompt_Literal: [""],
//   Prompt_Answer: ["eles"],
//   Prompt_Translation: ["they", "speak"],
//   Prompt_Literal_Translation: null,
// };
let tracker = 0;

// CASE 2 : Make sure to convert strings to array with split()
// let objArr = {
//   Prompt: jsonData[tracker].Prompt_Translation1.split("~"),
//   Prompt_Literal: jsonData[tracker].Prompt_Literal.split(" "), // This shouldn't matter for now
//   Prompt_Answer: jsonData[tracker].Prompt_Exit_Answer,
//   Prompt_Translation: jsonData[tracker].Prompt_Translation.split("~"),
//   Prompt_Literal_Translation:
//     jsonData[tracker].Prompt_Literal_Translation.split("~"),
// };

//  CASE 3 : Make sure to convert strings to array with split()
const objArr = {
  Prompt: ["_", "_", "grande"],
  Prompt_Literal: ["xyz", "abc", "pqr"], // This shouldn't matter for now
  Prompt_Answer: ["o", "homem"],
  Prompt_Translation: ["the", "big", "man"],
  Prompt_Literal_Translation: [0, 2],
};
const Prompt_template_V7 = () => {
  const [data, setData] = React.useState({});
  const dataFetchedRef = React.useRef(false);

  const [currentPromptAnswer, setCurrentPromptAnswer] = React.useState("");
  const [counter, setCounter] = React.useState(0);
  const [promptBigArr, setPromptBigArr] = React.useState([]);
  const [promptTranslationBigArr, setPromptTranslationBigArr] = React.useState(
    []
  );
  const [promptTranslationIndeces, setPromptTranslationIndeces] =
    React.useState([]);
  const [promptTranslationCounter, setPromptTranslationCounter] =
    React.useState(0);
  const [promptShowTick, setPromptShowTick] = React.useState(false);

  const PromptBigArrFunc = React.useCallback((data) => {
    const {
      Prompt,
      Prompt_Answer,
      Prompt_Literal,
      Prompt_Literal_Translation,
      Prompt_Translation,
    } = data;

    let PromptAnswerArrLen = Prompt_Answer.length;
    let PromptAnswerCnt = 0;
    let PromptResArr = [];
    let PromptNow;

    PromptNow = Prompt;
    let Prompt_Literal_TranslationNow = Prompt_Literal_Translation;
    if (Prompt_Literal_TranslationNow === null || undefined || "") {
      Prompt_Literal_TranslationNow = Prompt_Translation.map(
        (_, index) => index
      );
    }
    console.log(
      "Prompt_Literal_TranslationNow :",
      Prompt_Literal_TranslationNow
    );

    for (let i = 0; i < Prompt.length; i++) {
      if (PromptNow[i] === "_") {
        if (PromptAnswerCnt < PromptAnswerArrLen) {
          PromptResArr.push({
            isDash: true,
            isValue: PromptNow[i],
            isPromptLiteral: Prompt_Answer[PromptAnswerCnt],
            isPromptPosition: i,
            isPromptTranslationLiteral: Prompt_Literal_TranslationNow[i]
              ? Prompt_Literal_TranslationNow[i]
              : "",
            isDashAnswerValue: Prompt_Answer[PromptAnswerCnt],
            isSuccess: false,
            isDashNumber: PromptAnswerCnt,
          });
          PromptAnswerCnt++;
        }
      } else {
        PromptResArr.push({
          isDash: false,
          isValue: PromptNow[i],
          isPromptLiteral: Prompt_Literal[i],
          isPromptPosition: i,
          isPromptTranslationLiteral: Prompt_Literal_TranslationNow[i]
            ? Prompt_Literal_TranslationNow[i]
            : "",
          isDashAnswerValue: "NOT AN ANSWER KIMO",
          isSuccess: false,
          isDashNumber: "x",
        });
      }
    }

    //console.log("PromptResArr :", PromptResArr);

    setCurrentPromptAnswer(Prompt_Answer[counter]);
    setPromptBigArr(PromptResArr);
  }, []);

  const PromptTranslationBigArrFunc = React.useCallback((data) => {
    const {
      Prompt_Translation,
      Prompt_Literal,
      Prompt,
      Prompt_Literal_Translation,
      Prompt_Answer,
    } = data;
    let PromptNow;

    PromptNow = Prompt;
    let Prompt_Literal_TranslationNow = Prompt_Literal_Translation;
    if (Prompt_Literal_TranslationNow === null || undefined || "") {
      Prompt_Literal_TranslationNow = Prompt_Translation.map(
        (_, index) => index
      );
    }

    const indeces = [];
    const notIndeces = [];
    for (const element in Prompt) {
      if (Prompt[element] === "_") {
        indeces.push(+element);
      } else {
        notIndeces.push(+element);
      }
    }
    console.log("indeces :", indeces);
    setPromptTranslationIndeces(indeces);
    let indexCntr = 0;
    let notIndexCntr = 0;

    let PromptTranslationResArr = [];
    for (let i = 0; i < Prompt_Translation.length; i++) {
      let value = Prompt_Translation[i];
      let position = Prompt_Literal_TranslationNow[i];
      if (+position === indeces[indexCntr] && indexCntr === 0) {
        PromptTranslationResArr.push({
          isValue: value,
          isPromptTranslationOrange: true,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
        });
        indexCntr++;
      } else if (+position === notIndeces[notIndexCntr]) {
        PromptTranslationResArr.push({
          isValue: value,
          isPromptTranslationOrange: false,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
        });
        notIndexCntr++;
      } else {
        PromptTranslationResArr.push({
          isValue: value,
          isPromptTranslationOrange: false,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: true,
        });
      }
    }

    console.log("PromptTranslationResArr :", PromptTranslationResArr);
    setPromptTranslationBigArr(PromptTranslationResArr);
  }, []);

  const oneHandler = () => {
    const promptNewState = promptBigArr.map((obj) => {
      if (obj.isDashNumber === counter) {
        return { ...obj, isSuccess: true, isDash: false };
      } else {
        return { ...obj };
      }
    });
    if (counter < data.Prompt_Answer.length) {
      setPromptBigArr(promptNewState);
      setCounter((counter) => counter + 1);
      setCurrentPromptAnswer(data.Prompt_Answer[counter + 1]);
      if (counter === data.Prompt_Answer.length - 1) {
        setTimeout(() => {
          setPromptShowTick(true);
        }, 1000 * 0.4);
      }
    }

    if (promptTranslationCounter < promptTranslationIndeces.length) {
      const promptTranslationNewState = promptTranslationBigArr.map((obj) => {
        console.log(promptTranslationIndeces[promptTranslationCounter]);
        if (
          obj.isPromptTranslationPosition ===
          promptTranslationIndeces[promptTranslationCounter]
        ) {
          return {
            ...obj,
            isPromptTranslationGray: true,
            isPromptTranslationOrange: false,
          };
        } else if (
          obj.isPromptTranslationPosition ===
          promptTranslationIndeces[promptTranslationCounter + 1]
        ) {
          return {
            ...obj,
            isPromptTranslationGray: false,
            isPromptTranslationOrange: true,
            isPromptTranslationDefault: false,
          };
        } else {
          return { ...obj };
        }
      });
      //console.log(promptTranslationNewState);

      setPromptTranslationBigArr(promptTranslationNewState);
      setPromptTranslationCounter((counter) => counter + 1);
    }
  };

  const loadData = React.useCallback(() => {
    let data = objArr;
    setData(data);
    PromptBigArrFunc(data);
    PromptTranslationBigArrFunc(data);
  }, []);

  React.useEffect(() => {
    console.count("Times Mounted");
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    loadData();

    return () => {
      console.log("clean up!");
    };
  }, []);

  return (
    <>
      <div className="prompt-banner-container">
        <div className="prompt-v7-translation-container tracking-in-expand scale-out-ver-bottom">
          {promptTranslationBigArr.map((item) => {
            const {
              isValue,
              isPromptTranslationOrange,
              isPromptTranslationPosition,
              isPromptTranslationGray,
              isPromptTranslationDefault,
              isDash,
            } = item;
            return (
              <div
                key={isPromptTranslationPosition}
                className={`prompt-v7-translation-content   ${
                  isPromptTranslationOrange
                    ? "prompt-orange"
                    : isDash && isPromptTranslationDefault
                    ? "prompt-black"
                    : !isPromptTranslationDefault && isPromptTranslationGray
                    ? "prompt-gray"
                    : "prompt-black"
                }`}
              >
                <span>{isValue}</span>
              </div>
            );
          })}
        </div>
        <div className="prompt-right-arrow-container">
          <img
            src={rightArrow}
            alt="banner"
            className="prompt-right-arrow slit-in-vertical"
          />
        </div>
        <div className="prompt-v7-prompt-container">
          {promptBigArr.map((item) => {
            const {
              isDash,
              isPromptLiteral,
              isPromptPosition,
              isDashAnswerValue,
              isSuccess,
              isValue,
            } = item;

            return (
              <div
                key={isPromptPosition}
                className={`prompt-v7-prompt-content ${
                  isDash ? " " : "prompt-green text-focus-in"
                }`}
              >
                <span style={{ visibility: isDash ? "hidden" : "visible" }}>
                  {isDash && !isSuccess
                    ? isDashAnswerValue
                    : isSuccess
                    ? isDashAnswerValue
                    : isValue}
                </span>
              </div>
            );
          })}
        </div>

        <span className="prompt-tick-container">
          <img
            style={{ visibility: !promptShowTick ? "hidden" : "visible" }}
            src={greenTick}
            alt="prompt-tick"
            className={`prompt-tick ${!promptShowTick ? "" : "fade-in"} `}
          />
        </span>
      </div>

      <div className="btn-container">
        <button onClick={() => oneHandler()}>ACTION</button>
      </div>
    </>
  );
};

export default Prompt_template_V7;
