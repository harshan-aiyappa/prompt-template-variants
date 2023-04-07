import React from "react";

import "../Prompt-template-V1/Prompt_template_V1.css";
import rightArrow from "../../assets/images/gray-arrow/right-arrow.png";
import greenTick from "../../assets/images/new-green-tick/Path 225.png";

// Make sure to convert strings to array with split()
const objArr = {
  Prompt: ["_", "_", "felizes."],
  Prompt_Literal: ["_", "_", "felizes."],
  Prompt_Answer: ["eles", "estao"],
  Prompt_Translation: ["They-0", "are-1", "happy-2"],
  Prompt_Literal_Translation: ["They", "are", "happy"], // ignore this for functionalities [ No need positions here ]
};

const Prompt_template_V1_SC_1 = () => {
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
    } = data;

    let PromptAnswerArrLen = Prompt_Answer.length;
    let PromptAnswerCnt = 0;
    let PromptResArr = [];
    let PromptNow;

    PromptNow = Prompt;

    for (let i = 0; i < Prompt.length; i++) {
      if (PromptNow[i] === "_") {
        if (PromptAnswerCnt < PromptAnswerArrLen) {
          PromptResArr.push({
            isDash: true,
            isValue: PromptNow[i],
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
          isValue: PromptNow[i],
          isPromptLiteral: Prompt_Literal[i],
          isPromptPosition: i,
          isPromptTranslationLiteral: Prompt_Literal_Translation[i],
          isDashAnswerValue: "NOT AN ANSWER KIMO",
          isSuccess: false,
          isDashNumber: "x",
        });
      }
    }

    console.log("PromptResArr :", PromptResArr);

    setCurrentPromptAnswer(Prompt_Answer[counter]);
    setPromptBigArr(PromptResArr);
  }, []);

  const PromptTranslationBigArrFunc = React.useCallback((data) => {
    const { Prompt_Translation, Prompt_Literal, Prompt } = data;
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

    console.log(PromptTranslationResArr);
    setPromptTranslationBigArr(PromptTranslationResArr);
  }, []);

  const oneHandler = () => {
    if (currentPromptAnswer === data.Prompt_Answer[counter]) {
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
          setPromptShowTick(true);
        }
      }

      if (promptTranslationCounter < promptTranslationIndeces.length) {
        const promptTranslationNewState = promptTranslationBigArr.map((obj) => {
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
        console.log(promptTranslationNewState);

        setPromptTranslationBigArr(promptTranslationNewState);
        setPromptTranslationCounter((counter) => counter + 1);
      }
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
        <div className="prompt-v1-translation-container tracking-in-expand">
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
                className={`prompt-v1-translation-content   ${
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
        <div className="prompt-v1-prompt-container">
          {promptBigArr.map((item) => {
            const {
              isDash,
              isPromptLiteral,
              isPromptPosition,
              isDashAnswerValue,
              isValue,
              isSuccess,
            } = item;

            return (
              <div
                key={isPromptPosition}
                className={`prompt-v1-prompt-content ${
                  isDash ? " " : "prompt-green"
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
            className={`prompt-tick ${!promptShowTick ? "" : "bounce-in-top"} `}
          />
        </span>
      </div>

      <div className="btn-container">
        <h3>
          SCENE 1 : If its taken From
          <i style={{ color: "var(--red)" }}> Prompt Translation</i>{" "}
          <span style={{ color: "var(--green)" }}>
            | {objArr.Prompt_Translation.join(" | ")} |
          </span>
        </h3>
        <button onClick={oneHandler}>ACTION</button>
      </div>
    </>
  );
};

export default Prompt_template_V1_SC_1;

/* <Stack sx={{width:"100% !important"}}><Div>Kimosa</Div></Stack>
 <prompt-v1></prompt-v1> 
       <CustomContainer disableGutters={true}>  </CustomContainer>*/
