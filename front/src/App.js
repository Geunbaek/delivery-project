import { Route, Routes } from "react-router-dom";
import Main from "./components/home/Main";
import ResultMap from "./components/result/ResultMap";
import { GlobalStyle } from "./styles/style/GlobalStyle";
import SurveyMain from "./components/survey/SurveyMain";
import { ThemeProvider } from "styled-components";
import { palette } from "./styles/style/palette";
import AnalysisMain from "./components/analysis/AnalysisMain";

function App() {
  return (
    <>
      <ThemeProvider
        theme={{
          palette: {
            violet: "#b197fc",
          },
        }}
      >
        <GlobalStyle />
        <Routes>
          <Route path="/analysis" element={<AnalysisMain />} />
          <Route path="/result" element={<ResultMap />} />
          <Route path="/survey" element={<SurveyMain />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
