import { dev } from "./config";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { AppAction } from "./actions";
import reducer, { AppState } from "./reducer";
import { applyMiddleware, createStore, Middleware, Store, compose } from "redux";

let middleware: Middleware[] = [thunk];

if (dev) {
  middleware = [...middleware, logger];
}

export default (state: AppState): Store<AppState, AppAction> => {
  const win = window as any;
  const composeEnhancers = typeof window === "object" && win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
    compose;
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware)
  );

  return createStore(
    reducer,
    state,
    enhancer
  );
};