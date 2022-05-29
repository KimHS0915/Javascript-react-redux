import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Detail = ({ toDos }) => {
  const id = useParams().id;
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id));
  const created = new Date();
  created.setTime(parseInt(id));
  return (
    <>
      <h1>{toDo?.text}</h1>
      <h5>Created at : {created.toString().slice(0, -18)}</h5>
    </>
  );
};

const mapStateToProps = (state) => {
  return { toDos: state };
};

export default connect(mapStateToProps)(Detail);
