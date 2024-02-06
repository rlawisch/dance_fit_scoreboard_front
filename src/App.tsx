import Routing from "./routes";
import { ToastContainer } from "react-toastify";
import { GlobalStyle } from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <main>
      <ToastContainer
        autoClose={5000} />
      <GlobalStyle />
      <Routing />
    </main>
  );
}

export default App;
