import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { remove } from "../store";

const Detail = () => {
  const toDos = useSelector((state) => state);
  const dispatch = useDispatch();
  const navi = useNavigate();
  const id = useParams().id;
  const toDo = toDos.reducer.find((toDo) => toDo.id === parseInt(id));
  const created = new Date();
  created.setTime(parseInt(id));
  const onBtnClick = (id) => dispatch(remove(id));
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at : {created.toString().slice(0, -18)}</h5>
      <button onClick={() => navi("/")}>Back</button>
      <button
        onClick={() => {
          onBtnClick(parseInt(id));
          navi("/");
        }}
      >
        Del
      </button>
    </>
  );
};

export default Detail;
