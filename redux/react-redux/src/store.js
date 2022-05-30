import { combineReducers, createStore } from "redux";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return { type: ADD, text };
};

const deleteToDo = (id) => {
  return { type: DELETE, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const persistConfig = {
  key: "toDo",
  storage: storage,
};

const allReducer = combineReducers({ reducer });

export const store = createStore(persistReducer(persistConfig, allReducer));

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export const persistor = persistStore(store);
