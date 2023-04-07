import React from "react";

import "../Prompt-template-V3/Prompt_template_V3.css";
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
  Prompt: "we eat in _ is nos comemos",
  Prompt_Literal: "we eat in _ is nos comemos",
  Prompt_Answer: "Portuguese",
  Prompt_Translation: "Portuguese",
  Prompt_Literal_Translation: "Portuguese",
};

const Prompt_template_V3_SC__1 = () => {
  const [data, setData] = React.useState([]);
  const dataFetchedRef = React.useRef(false);

  const [promptShowTick, setPromptShowTick] = React.useState(false);
  const oneBigArr = React.useCallback((data) => {
    const {
      Prompt,
      Prompt_Literal,
      Prompt_Answer,
      Prompt_Translation,
      Prompt_Literal_Translation,
      Prompt_Language,
    } = data;

    const resArr = [];

    console.log(Prompt.split(" "));

    const arr = Prompt.split(" ");
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];

      if (element === "_") {
        resArr.push({
          isValue: Prompt_Answer,
          isDash: true,
          isSuccess: false,
          isDefault: false,
        });
      } else {
        resArr.push({
          isValue: element,
          isDash: false,
          isSuccess: false,
          isDefault: true,
        });
      }
    }

    console.log(resArr);

    return resArr;
  }, []);

  const loadData = React.useCallback(() => {
    let data = objArr2;
    setData(oneBigArr(data));
  }, []);

  const oneHandler = () => {
    const NewState = data.map((obj) => {
      if (obj.isDash) {
        return { ...obj, isSuccess: true, isDash: false };
      } else {
        return { ...obj };
      }
    });
    setData(NewState);
    setPromptShowTick(true);
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
        <div className="prompt-v3-translation-container tracking-in-expand">
          {data.map((item, index) => {
            const { isValue, isDash, isSuccess, isDefault } = item;
            return (
              <div
                className={`prompt-v3-translation-content ${
                  isDash
                    ? "shake-horizontal"
                    : isSuccess
                    ? "prompt-green"
                    : "prompt-black"
                }`}
                key={index}
              >
                <span style={{ visibility: isDash ? "hidden" : "visible" }}>
                  {isValue}
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
        <button onClick={oneHandler}>ACTION</button>
      </div>
    </>
  );
};

export default Prompt_template_V3_SC__1;
