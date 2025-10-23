import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Recommendation from "./pages/recommendation";
import Layout from "./layout";
import { useUser } from "./context/context";
import Splash from "./pages/splash";

function App() {
  const { name } = useUser();

  return (
    <Router>
      <Routes>
        {!name ? (
          <Route path="*" element={<Splash />} />
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/recommendation" element={<Recommendation />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
