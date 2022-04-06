import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home, Timer } from "./Pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </div>
  );
}

export default App;
