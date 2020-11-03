import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const env = process.env.NODE_ENV || "development";

let middleware = composeWithDevTools(
  applyMiddleware(thunk, reduxImmutableStateInvariant())
);

if (env === "production") {
  middleware = applyMiddleware(thunk);
}

const store = createStore(rootReducer, middleware);

export default store;
