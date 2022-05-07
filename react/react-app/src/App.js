import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import CoinTracker from "./components/CoinTracker";
import ToDo from "./components/ToDo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<MovieList />}></Route>
        <Route path="/movie/:id" element={<MovieDetail />}></Route>
        <Route path="/tracker/" element={<CoinTracker />}></Route>
        <Route path="/todo/" element={<ToDo />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
