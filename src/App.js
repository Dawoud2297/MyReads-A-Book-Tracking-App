import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home";


function App() {

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Home />
    </BrowserRouter>
  );
}

export default App;
