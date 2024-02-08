import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { ThemeProvider } from "styled-components";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import usePersistedState from "./utils/usePersistedState";
import { DefaultTheme } from "styled-components/dist/types";
import Routing from "./routes";

function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <main>
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={5000} />
        <GlobalStyle />
        <Header toggleTheme={toggleTheme}/>
        <Routing />
      </ThemeProvider>
    </main>
  );
}

export default App;
