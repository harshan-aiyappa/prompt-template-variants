import React from "react";

import "./Prompt_template_V4.css";
import rightArrow from "../../assets/images/gray-arrow/right-arrow.png";
import greenTick from "../../assets/images/new-green-tick/Path 225.png";

// Make sure to convert strings to array with split()
const objArr = {
  Prompt: "we eat in Portuguese is _",
  Prompt_Literal: "we eat in Portuguese is _",
  Prompt_Answer: "nos comemos",
  Prompt_Translation: "nos comemos",
  Prompt_Literal_Translation: "nos comemos",
};

const objArr2 = {
  Prompt: "eu fico _ da casa",
  Prompt_Literal: "eu fico _ da casa",
  Prompt_Answer: "atrás",
  Prompt_Translation: "atrás",
  Prompt_Literal_Translation: "atrás ",
};
const objArr3 = {
  Prompt: "I can sing in is _",
  Prompt_Literal: "I can sing in is _",
  Prompt_Answer: "eu posso cantar",
  Prompt_Translation: "eu posso cantar",
  Prompt_Literal_Translation: "eu posso cantar",
};

const objArr4 = {
  Prompt: "eu fal_",
  Prompt_Literal: "",
  Prompt_Answer: "o",
  Prompt_Translation: "I speak",
  Prompt_Literal_Translation: "",
  Prompt_Flag: "0",
};

const Prompt_template_V4 = () => {
  const [data, setData] = React.useState([]);
  const dataFetchedRef = React.useRef(false);
  const [promptShowTick, setPromptShowTick] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);

  const [promptBigArr, setPromptBigArr] = React.useState([]);
  const [promptTranslationBigArr, setPromptTranslationBigArr] = React.useState(
    []
  );

  const oneBigArr = React.useCallback((data) => {
    const {
      Prompt,
      Prompt_Literal,
      Prompt_Answer,
      Prompt_Translation,
      Prompt_Literal_Translation,
    } = data;

    let strArr = Prompt.split(" ");
    let Prompt_TranslationArr = Prompt_Translation.split(" ");
    // console.log("=> ", Prompt_Translation.split(" "));
    let tempPtArr = [];
    for (var i = 0; i < Prompt_TranslationArr.length; i++) {
      let value = Prompt_TranslationArr[i];
      //console.log("value :", value);
      if (strArr[i].includes("_")) {
        tempPtArr.push({
          isValue: value,
          isPromptTranslationOrange: true,
          isPromptTranslationPosition: +i,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
        });
      } else {
        tempPtArr.push({
          isValue: value,
          isPromptTranslationOrange: false,
          isPromptTranslationPosition: +i,
          isPromptTranslationGray: false,
          isPromptTranslationDefault: false,
        });
      }
    }
    setPromptTranslationBigArr(tempPtArr);

    const resArr = [];

    for (var i = 0; i < strArr.length; i++) {
      let word = strArr[i];
      if (word === "_") {
        //console.log("1");
        resArr.push({
          isValue: word,
          isWordDash: true,
          isLetterDash: false,
          isSuccess: false,
          isDashFullWord: null,
          isDashAnswer: Prompt_Answer,
        });
      } else if (word.includes("_")) {
        let indexer = word.indexOf("_");
        //console.log("2");
        resArr.push({
          isValue: word,
          isWordDash: false,
          isLetterDash: true,
          isSuccess: false,
          isDashFullWord: word.replaceAt(indexer, Prompt_Answer),
          isDashAnswer: Prompt_Answer,
        });
      } else {
        //console.log("3");
        resArr.push({
          isValue: word,
          isWordDash: false,
          isLetterDash: false,
          isSuccess: false,
          isDashAnswer: Prompt_Answer,
        });
      }
    }
    //console.log("resArr :", resArr);
    setPromptBigArr(resArr);
  }, []);

  String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
  };
  const loadData = React.useCallback(() => {
    let data = objArr4;
    setData(oneBigArr(data));
  }, []);

  //console.log("promptBigArr :", promptBigArr);
  //console.log("promptTranslationBigArr :", promptTranslationBigArr);

  const oneHandler = () => {
    setShowAnswer(true);
    setTimeout(() => {
      setPromptShowTick(true);
    }, 1000 * 0.4);
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
        <div className="prompt-v4-translation-container tracking-in-expand">
          {promptTranslationBigArr.map((item, index) => {
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
                key={index}
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
        <div className="prompt-v4-prompt-container">
          {promptBigArr.map((item, index) => {
            const {
              isValue,
              isWordDash,
              isLetterDash,
              isSuccess,
              isDashFullWord,
              isDashAnswer,
            } = item;

            if (isLetterDash) {
              //console.log(isValue.split(""));
            } else {
              //console.log("Just Word!");
            }

            return isLetterDash ? (
              <div key={index} className="prompt-v4-prompt-content-box">
                {isValue.split("").map((item, index) => {
                  let indexer = isValue.indexOf("_");
                  // console.log("indexer :", index === indexer);
                  // console.log("inner :", item);
                  return (
                    <div
                      key={index}
                      className={`prompt-v4-prompt-content ${
                        index === indexer
                          ? showAnswer
                            ? "prompt-green text-focus-in"
                            : "prompt-v4-prompt-make-orange-dash shake-horizontal"
                          : ""
                      }`}
                    >
                      <span
                        style={{
                          visibility:
                            (index === indexer) & !showAnswer
                              ? "hidden"
                              : "visible",
                        }}
                      >
                        {item === "_" ? isDashAnswer : item}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div key={index} className="prompt-v4-prompt-content-box">
                {isValue}
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

export default Prompt_template_V4;
