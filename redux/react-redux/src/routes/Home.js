import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store";
import ToDo from "../components/ToDo";

const Home = () => {
  const [text, setText] = useState("");
  const toDos = useSelector((state) => state);
  const dispatch = useDispatch();
  const onChange = (event) => {
    setText(event.target.value);
  };
  const onSubmit = (event) => {
    if (!text) {
      return;
    }
    event.preventDefault();
    dispatch(add(text));
    setText("");
  };
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.reducer.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
};

export default Home;
