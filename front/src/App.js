import Header from "./components/Header";
import Main from "./components/home/Main";
import { GlobalStyle } from "./styles/style/GlobalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
    </>
  );
}

export default App;
