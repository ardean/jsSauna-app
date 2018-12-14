import App from "./App";
import * as React from "react";
import { baseUrl } from "./config";
import transport from "./transport";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import session from "./services/session";
import statusApi from "./status/statusApi";
import configureStore from "./configureStore";
import settingsApi from "./settings/settingsApi";
import GlobalStyle from "./components/GlobalStyle";

const store = configureStore({
  sessionId: session.getSessionId(),
  loginError: "",
  loading: true,
  loginRequired: true,
  heating: false,
  humidity: null,
  maxTemperature: null,
  on: false,
  targetTemperature: null,
  temperature: null
});

transport.connect(baseUrl);

settingsApi.init(store);
statusApi.init(store);

ReactDOM.render(
  <Provider store={store}>
    <>
      <GlobalStyle />
      <App />
    </>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
