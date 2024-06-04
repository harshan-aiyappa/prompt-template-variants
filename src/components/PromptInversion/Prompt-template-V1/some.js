import React from "react";

import "./Prompt_template_V1.css";
import rightArrow from "../../assets/images/gray-arrow/right-arrow.png";
import greenTick from "../../assets/images/check_circle-black-48dp.png";

const Prompt_template_V1 = () => {
  const [data, setData] = React.useState({
    english: [
      {
        value: "this",
        isOrange: true,
        isBlack: false,
        isGray: false,
        isIndex: 0,
      },
      {
        value: "man",
        isOrange: false,
        isBlack: false,
        isGray: false,
        isIndex: 1,
      },
    ],
    portuguese: [
      { value: "este", isGreen: false, isCorrect: false, isIndex: 0 },
      { value: "homem", isGreen: false, isCorrect: false, isIndex: 1 },
    ],
  });

  let Answer_length = data["portuguese"].length;

  const [showLeftWords, setShowLeftWords] = React.useState(false);
  const [showRightWords, setShowRightWords] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [showGreenTick, setShowGreenTick] = React.useState(false);

  const dashOrange = <span className="banner-orange-dash"></span>;

  const answerDash = <span className="banner-answer-dash">{"kimo"}</span>;

  const DoAction = (cnt) => {
    const newStateEnglish = data["english"].map((obj) => {
      if (obj.isIndex === cnt) {
        return { ...obj, isGray: true, isBlack: false, isOrange: false };
      }

      if (obj.isIndex === cnt + 1) {
        return { ...obj, isGray: false, isBlack: false, isOrange: true };
      }

      return obj;
    });

    const newStatePortuguese = data["portuguese"].map((obj) => {
      if (obj.isIndex === cnt) {
        return { ...obj, isGreen: true, isCorrect: true };
      }

      if (obj.isIndex === cnt + 1) {
        return { ...obj, isGreen: false, isCorrect: false };
      }

      return obj;
    });
    console.log("newStateEnglish :", newStateEnglish);
    console.log("newStatePortuguese :", newStatePortuguese);
    setData({
      ...data,
      english: newStateEnglish,
      portuguese: newStatePortuguese,
    });
    setCounter(counter + 1);
    if (counter === Answer_length - 1) {
      setShowGreenTick(true);
    }
  };

  console.log("Answer_length here :", Answer_length);
  console.log("counter here :", counter);

  React.useEffect(() => {}, []);

  return (
    <>
      <div className="banner-container">
        <div className="banner-contents tracking-in-expand">
          {data["english"].map((item, index) => {
            if (item.isOrange) {
              return (
                <span key={index} className="banner-orange">
                  {item.value}
                </span>
              );
            } else if (item.isGray) {
              return (
                <span key={index} className="banner-gray">
                  {item.value}
                </span>
              );
            } else {
              return (
                <span key={index} className="banner-black">
                  {item.value}
                </span>
              );
            }
          })}
          <span className="banner-qtn-arrow-container">
            <img
              src={rightArrow}
              alt="banner"
              className="banner-qtn-arrow slit-in-vertical"
            />
          </span>
          {data.portuguese.map((item, index) => {
            if (item.isCorrect) {
              return (
                <span key={index} className="banner-answer-right">
                  {item.value}
                </span>
              );
            } else {
              return (
                <span key={index} className="banner-answer-dash">
                  <span style={{ visibility: "hidden" }}>{item.value}</span>
                </span>
              );
            }
          })}
          {showGreenTick && (
            <span className="banner-qtn-arrow-container">
              <img
                src={greenTick}
                alt="banner"
                className="banner-qtn-arrow bounce-in-top"
              />
            </span>
          )}
        </div>
      </div>

      <div className="btn-container">
        <button onClick={() => DoAction(counter)}>P1 ACTION</button>
      </div>
    </>
  );
};

export default Prompt_template_V1;

/* <Stack sx={{width:"100% !important"}}><Div>Kimosa</Div></Stack>
 <Banner></Banner> 
       <CustomContainer disableGutters={true}>  </CustomContainer>*/

/**`prompt-v2-1-translation-content   ${
                  isPromptTranslationOrange
                    ? "prompt-orange"
                    : isDash && isPromptTranslationDefault
                    ? "prompt-black"
                    : !isPromptTranslationDefault && isPromptTranslationGray
                    ? "prompt-gray"
                    : "prompt-gray"
                }` */
