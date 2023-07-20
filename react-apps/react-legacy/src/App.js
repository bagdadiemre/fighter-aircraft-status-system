import "./style.css";
import Navbar from "./navbar.js";
import { Route, Routes } from "react-router-dom";
import Page2 from "./pages/page2.js";
import Page1 from "./pages/page1.js";
import Home from "./pages/home.js";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
