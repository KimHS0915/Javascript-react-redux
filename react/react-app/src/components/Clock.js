import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

const Clock = () => {
  const [clock, setClock] = useState("00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setClock(() => date.toLocaleTimeString("en-gb"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className={styles.clock}>{clock}</div>;
};

export default Clock;
