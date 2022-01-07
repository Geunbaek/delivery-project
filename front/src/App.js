import { Route, Routes } from "react-router-dom";
import Main from "./components/home/Main";
import ResultMap from "./components/result/ResultMap";
import { GlobalStyle } from "./styles/style/GlobalStyle";
import SurveyMain from "./components/survey/SurveyMain";
import Location from "./components/survey/sections/Location";

// import Test from "./components/survey/Test";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/result" element={<ResultMap />} />
        <Route path="/survey" element={<SurveyMain />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
