import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./components/HomeScreen/HomeScreen";
import ScreenOne from "./components/KimoTest/ScreenOne";
import ScreenTwo from "./components/KimoTest/ScreenTwo";

// Prompt Versions Components imports

import Prompt_template_V1 from "./components/Prompt-template-V1/Prompt_template_V1";
import Prompt_template_V1_1 from "./components/Prompt-template-V1-1/Prompt_template_V1_1";
import Prompt_template_V1_2 from "./components/Prompt-template-V1-2/Prompt_template_V1_2";
import Prompt_template_V2 from "./components/Prompt-template-V2/Prompt_template_V2";
import Prompt_template_V2_1 from "./components/Prompt-template-V2-1/Prompt_template_V2_1";
import Prompt_template_V2_2 from "./components/Prompt-template-V2-2/Prompt_template_V2_2";

import Prompt_template_V2_SC_1 from "./components/Prompt-template-V2-SC-1/Prompt_template_V2_SC_1";
import Prompt_template_V2_SC_2 from "./components/Prompt-template-V2-SC-2/Prompt_template_V2_SC_2";
import Prompt_template_V2_SC_3 from "./components/Prompt-template-V2-SC-3/Prompt_template_V2_SC_3";
import Prompt_template_V1_SC_1 from "./components/Prompt-template-V1-SC-1/Prompt-template-V1-SC-1";
import Prompt_template_V3 from "./components/Prompt-template-V3/Prompt_template_V3";
import Prompt_template_V3_SC_1 from "./components/Prompt_template_V3-SC-1/Prompt_template_V3_SC__1";
import Prompt_template_V3_SC_2 from "./components/Prompt_template_V3-SC-2/Prompt_template_V3_SC_2";
import Prompt_template_V4 from "./components/Prompt-template-V4/Prompt_template_V4";

/* { For Testing ONLY } */

import Test_P1_case from "./components/Test_P1_case/Test_P1_case";
import Test_P2_case from "./components/Test_P2_case/Test_P2_case";

import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            exact
            path="Prompt_template_V1"
            element={<Prompt_template_V1 />}
          />
          <Route
            exact
            path="Prompt_template_V1_1"
            element={<Prompt_template_V1_1 />}
          />
          <Route
            exact
            path="Prompt_template_V1_2"
            element={<Prompt_template_V1_2 />}
          />
          <Route
            exact
            path="Prompt_template_V2"
            element={<Prompt_template_V2 />}
          />
          <Route
            exact
            path="Prompt_template_V2_1"
            element={<Prompt_template_V2_1 />}
          />
          <Route
            exact
            path="Prompt_template_V2_2"
            element={<Prompt_template_V2_2 />}
          />
          <Route
            exact
            path="Prompt_template_V3"
            element={<Prompt_template_V3 />}
          />
          <Route
            exact
            path="Prompt_template_V2_SC_1"
            element={<Prompt_template_V2_SC_1 />}
          />
          <Route
            exact
            path="Prompt_template_V2_SC_2"
            element={<Prompt_template_V2_SC_2 />}
          />
          <Route
            exact
            path="Prompt_template_V2_SC_3"
            element={<Prompt_template_V2_SC_3 />}
          />
          <Route
            exact
            path="Prompt_template_V1_SC_1"
            element={<Prompt_template_V1_SC_1 />}
          />
          <Route
            exact
            path="Prompt_template_V3_SC_1"
            element={<Prompt_template_V3_SC_1 />}
          />
          <Route
            exact
            path="Prompt_template_V3_SC_2"
            element={<Prompt_template_V3_SC_2 />}
          />
          <Route
            exact
            path="Prompt_template_V4"
            element={<Prompt_template_V4 />}
          />

          <Route exact path="s1" element={<ScreenOne />} />
          <Route exact path="s2" element={<ScreenTwo />} />
          {/* { For Testing ONLY } */}
          <Route exact path="Test_P1_case" element={<Test_P1_case />} />
          <Route exact path="Test_P2_case" element={<Test_P2_case />} />
        </Routes>

        <div className="list">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="Prompt_template_V1">P1</Link>
            </li>
            {/* <li>
              <Link to="Prompt_template_V1_SC_1">P1 SCENE 1</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V1_1">P1.1</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V1_2">P1.2</Link>
            </li> */}
            <li>
              <Link to="Prompt_template_V2">P2</Link>
            </li>
            {/* <li>
              <Link to="Prompt_template_V2_SC_1">P2 SCENE 1</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V2_SC_2">P2 SCENE 2</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V2_SC_3">P2 SCENE 3</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V2_1">P2.1</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V3">P3</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V3_SC_1">P3 SCENE 1</Link>
            </li> */}
            {/* <li>
              <Link to="Prompt_template_V3_SC_2">P3 SCENE 2</Link>
            </li> */}
            <li>
              <Link to="Prompt_template_V4">P4</Link>
            </li>
            {/* { For Testing ONLY } */}
            <li>
              <Link to="Test_P1_case">Test_P1_case</Link>
            </li>
            <li>
              <Link to="Test_P2_case">Test_P2_case</Link>
            </li>
          </ul>
        </div>
      </Router>
    </div>
  );
}

export default App;
