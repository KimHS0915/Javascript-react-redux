import { useState } from "react";
import Clock from "./Clock";
import Quotes from "./Quotes";
import Weather from "./Weather";
import styles from "./ToDo.module.css";

const ToDo = () => {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDo("");
    setToDos((currentArray) => [toDo, ...currentArray]);
  };
  const onDelete = (event) => {
    setToDos((currentArray) =>
      currentArray.filter((item, index) => {
        return index !== parseInt(event.target.value);
      })
    );
  };
  return (
    <div className={styles.container}>
      <Weather />
      <Clock />
      <h1 className={styles.title}>My To Dos ({toDos.length})</h1>
      <Quotes />
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write a to do"
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => (
          <div className={styles.do} key={index}>
            <li className={styles.li}>{item}</li>
            <button
              onClick={onDelete}
              value={index}
              className={styles.deleteBtn}
            >
              ❌
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
