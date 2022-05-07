import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>
        <Link to={`/movies/`}>Movies</Link>
      </h3>
      <h3>
        <Link to={`/todo/`}>To Do List</Link>
      </h3>
      <h3>
        <Link to={`/tracker/`}>Coin Tracker</Link>
      </h3>
    </div>
  );
};

export default Home;
