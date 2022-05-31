import { combineReducers } from "redux";
import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = createReducer([], {
  [addToDo]: (state, action) => {
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>
    state.filter((toDo) => toDo.id !== action.payload),
});

const persistConfig = {
  key: "toDo",
  storage: storage,
};

const allReducer = combineReducers({ reducer });
const persistedReducer = persistReducer(persistConfig, allReducer);
// export const store = createStore(persistReducer(persistConfig, allReducer));
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export const persistor = persistStore(store);
