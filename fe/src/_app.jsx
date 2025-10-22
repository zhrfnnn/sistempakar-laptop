import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Recommendation from "./pages/recommendation";
import Layout from "./layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<Recommendation />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
