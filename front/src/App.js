import { Route, Routes } from "react-router-dom";
import Main from "./components/home/Main";
import ResultMap from "./components/result/ResultMap";
import { GlobalStyle } from "./styles/style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/result" element={<ResultMap />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
