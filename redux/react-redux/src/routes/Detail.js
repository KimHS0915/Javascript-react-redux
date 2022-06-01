import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { remove } from "../store";

const Detail = ({ toDos, onBtnClick }) => {
  const navi = useNavigate();
  const id = useParams().id;
  const toDo = toDos.reducer.find((toDo) => toDo.id === parseInt(id));
  const created = new Date();
  created.setTime(parseInt(id));
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

const mapStateToProps = (state) => {
  return { toDos: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBtnClick: (id) => dispatch(remove(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
