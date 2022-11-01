import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { Persistor } from "./redux-store/store.js";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <App />
    </PersistGate>
  </Provider>
  </BrowserRouter>
);