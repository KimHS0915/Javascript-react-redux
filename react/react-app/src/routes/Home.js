import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeBtn}>
        <Link to={`/movies/`}>Movies</Link>
      </div>
      <div className={styles.homeBtn}>
        <Link to={`/todo/`}>To Do List</Link>
      </div>
      <div className={styles.homeBtn}>
        <Link to={`/tracker/`}>Coin Tracker</Link>
      </div>
    </div>
  );
};

export default Home;
