import React from "react";
import "./Prompt_template_V2_1.css";
import greenTick from "../../assets/images/new-green-tick/Path 225.png";

const Prompt_template_V2_1 = () => {
  // Make sure to convert strings to array with split()
  const objArr = {
    Prompt: ["_", "_", "e", "feliz"],
    Prompt_Literal: ["_", "_", "e", "feliz"],
    Prompt_Answer: ["este", "homem"],
    Prompt_Translation: ["this-0", "man-1", "is-2", "happy-3"],
    Prompt_Literal_Translation: ["this", "man", "is", "happy"],
  };

  // SCENE 1 :
  //     Prompt: ["_", "_", "_"],
  //     Prompt_Literal: ["_", "_", "_"],
  //     Prompt_Answer: ["este", "homem", "piqueno"],
  //     Prompt_Translation: ["this-0", "small-2", "man-1"],
  //     Prompt_Literal_Translation: ["this", "man", "small"],

  // SCENE 2 :
  // Prompt: ["_", "homem", "_"],
  // Prompt_Literal: ["_", "homem", "_"],
  // Prompt_Answer: ["este", "piqueno"],
  // Prompt_Translation: ["this-0", "small-2", "man-1"],
  // Prompt_Literal_Translation: ["this", "man", "small"],

  // SCENE 3 :
  //    Prompt: ["_", "_", "e", "feliz"],
  //    Prompt_Literal: ["_", "_", "e", "feliz"],
  //    Prompt_Answer: ["este", "homem"],
  //    Prompt_Translation: ["this-0", "man-1", "is-2", "happy-3"],
  //    Prompt_Literal_Translation: ["this", "man", "is", "happy"],

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
  const [oneBigArrRes, setOneBigArrRes] = React.useState([]);

  const loadData = React.useCallback(() => {
    let data = objArr;
    setData(data);
    oneBigArr(PromptBigArrFunc(data), PromptTranslationBigArrFunc(data));
  }, []);

  const PromptBigArrFunc = React.useCallback((data) => {
    const {
      Prompt,
      Prompt_Answer,
      Prompt_Literal,
      Prompt_Literal_Translation,
    } = data;

    let PromptAnswerArrLen = Prompt_Answer.length;
    let PromptAnswerCnt = 0;
    let PromptResArr = [];
    let PromptNow;
    if (Prompt_Literal.length > 0) {
      PromptNow = Prompt_Literal;
    } else {
      PromptNow = Prompt;
    }

    for (let i = 0; i < Prompt.length; i++) {
      if (PromptNow[i] === "_") {
        if (PromptAnswerCnt < PromptAnswerArrLen) {
          PromptResArr.push({
            isDash: true,
            isPromptValue: PromptNow[i],
            isPromptLiteral: Prompt_Answer[PromptAnswerCnt],
            isPromptPosition: i,
            isPromptTranslationLiteral: Prompt_Literal_Translation[i],
            isDashAnswerValue: Prompt_Answer[PromptAnswerCnt],
            isSuccess: false,
            isDashNumber: PromptAnswerCnt,
          });
          PromptAnswerCnt++;
        }
      } else {
        PromptResArr.push({
          isDash: false,
          isPromptValue: PromptNow[i],
          isPromptLiteral: Prompt_Literal[i],
          isPromptPosition: i,
          isPromptTranslationLiteral: Prompt_Literal_Translation[i],
          isDashAnswerValue: "NOT AN ANSWER KIMO",
          isSuccess: false,
          isDashNumber: "x",
        });
      }
    }

    setCurrentPromptAnswer(Prompt_Answer[counter]);
    setPromptBigArr(PromptResArr);

    return PromptResArr;
  }, []);

  const PromptTranslationBigArrFunc = React.useCallback((data) => {
    const {
      Prompt_Translation,
      Prompt_Literal,
      Prompt,
      Prompt_Literal_Translation,
    } = data;
    let PromptNow;
    if (Prompt_Literal.length > 0) {
      PromptNow = Prompt_Literal;
    } else {
      PromptNow = Prompt;
    }

    const indeces = [];
    const notIndeces = [];
    for (const element in Prompt_Literal || Prompt) {
      if (Prompt_Literal[element] === "_" || Prompt[element] === "_") {
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
      let [value, position] = Prompt_Translation[i].split("-");

      if (+position === indeces[indexCntr] && indexCntr === 0) {
        PromptTranslationResArr.push({
          isPromptTranslationValue: value,
          isPromptTranslationOrange: true,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
          isPromptTranslationLiteralValue: Prompt_Literal_Translation[i],
          isPromptTranslationLiteralPosition: +i,
        });
        indexCntr++;
      } else if (+position === notIndeces[notIndexCntr]) {
        PromptTranslationResArr.push({
          isPromptTranslationValue: value,
          isPromptTranslationOrange: false,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
          isPromptTranslationLiteralValue: Prompt_Literal_Translation[i],
          isPromptTranslationLiteralPosition: +i,
        });
        notIndexCntr++;
      } else {
        PromptTranslationResArr.push({
          isPromptTranslationValue: value,
          isPromptTranslationOrange: false,
          isPromptTranslationPosition: +position,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: true,
          isPromptTranslationLiteralValue: Prompt_Literal_Translation[i],
          isPromptTranslationLiteralPosition: +i,
        });
      }
    }
    return PromptTranslationResArr;
  }, []);

  const oneBigArr = React.useCallback((promptArr, promptTranslationArr) => {
    const tempObj = [];
    for (let i = 0; i < promptArr.length; i++) {
      tempObj.push({ ...promptArr[i], ...promptTranslationArr[i] });
    }

    setOneBigArrRes(tempObj);
  }, []);

  console.log("oneBigArrRes :", oneBigArrRes);

  const oneHandler = () => {
    if (counter < data.Prompt_Answer.length) {
      const promptNewState = oneBigArrRes.map((obj) => {
        if (obj.isDashNumber === counter) {
          return { ...obj, isSuccess: true, isDash: false };
        } else {
          return { ...obj };
        }
      });

      setCounter((counter) => counter + 1);
      setCurrentPromptAnswer(data.Prompt_Answer[counter + 1]);
      if (counter === data.Prompt_Answer.length - 1) {
        setPromptShowTick(true);
      }
      setPromptTranslationCounter((counter) => counter + 1);

      const promptTranslationNewState = promptNewState.map((obj) => {
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

      setOneBigArrRes(promptTranslationNewState);
    }
  };

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
        {oneBigArrRes.map((item) => {
          const {
            isDash,
            isDashAnswerValue,
            isPromptPosition,
            isPromptTranslationDefault,
            isPromptTranslationGray,
            isPromptTranslationOrange,
            isPromptTranslationValue,
            isPromptValue,
            isSuccess,
          } = item;

          return (
            <div
              className="prompt-v2-1-container tracking-in-expand"
              key={isPromptPosition}
            >
              <div
                className={`prompt-v2-1-prompt-content ${
                  isDash ? " " : isSuccess ? "prompt-green" : "prompt-black"
                }`}
              >
                <span style={{ visibility: isDash ? "hidden" : "visible" }}>
                  {isPromptValue === "_" ? isDashAnswerValue : isPromptValue}
                </span>
              </div>
              <div
                className={`prompt-v2-1-translation-content   ${
                  isPromptTranslationOrange
                    ? "prompt-orange"
                    : isDash && isPromptTranslationDefault
                    ? "prompt-black"
                    : !isPromptTranslationDefault && isPromptTranslationGray
                    ? "prompt-gray"
                    : "prompt-black"
                }`}
              >
                <span>{isPromptTranslationValue}</span>
              </div>
            </div>
          );
        })}
        <span className="prompt-tick-container">
          <img
            style={{ visibility: !promptShowTick ? "hidden" : "visible" }}
            src={greenTick}
            alt="prompt-tick"
            className={`prompt-tick ${!promptShowTick ? "" : "bounce-in-top"} `}
          />
        </span>
      </div>
      <div className="btn-container">
        <button onClick={oneHandler}>ACTION</button>
      </div>
    </>
  );
};
export default Prompt_template_V2_1;
